type Person = {
  name: string;
  DOB: string; // Date of Birth in "YYYY-MM-DD" format
  TOB?: string; // Time of Birth in "HH:mm" format (optional)
  ageCounter?: HTMLElement;
};

// Active list of people
let people: Person[] = [];

// Attach event listener to the Submit button
// document
//   .getElementById("submit-button")
//   ?.addEventListener("click", async () => {
//     await submitPassword();
//   });

document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submit-button");
  const passwordInput = document.getElementById("password");
  const audioPlayer = document.querySelector("audio");

  // Play audio and call submitPassword when the button is clicked
  submitButton?.addEventListener("click", async () => {
    if (audioPlayer instanceof HTMLAudioElement) {
      try {
        await audioPlayer.play(); // Start playing audio
      } catch (error) {
        console.error("Audio play error:", error);
      }
    }
    await submitPassword();
  });

  // Trigger button click when "Enter" is pressed in the password field
  passwordInput?.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      if (audioPlayer instanceof HTMLAudioElement) {
        try {
          await audioPlayer.play(); // Start playing audio
        } catch (error) {
          console.error("Audio play error:", error);
        }
      }
      await submitPassword();
    }
  });
});

// Submit button handler
async function submitPassword(): Promise<void> {
  //console.log("Submit button clicked!"); // Debugging
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;

  try {
    await fetchAndDecryptData(password); // Fetch and decrypt the data

    // Hide the password input and submit button
    const loginSection = document.getElementById("login-section");
    if (loginSection) loginSection.style.display = "none";

    // Show the dropdown menu
    const dropdownWrapper = document.getElementById("dropdown-wrapper");
    if (dropdownWrapper) dropdownWrapper.style.display = "block";

    // Automatically select "Name" as the default order
    const dropdown = document.getElementById("sort-order") as HTMLSelectElement;
    if (dropdown) {
      dropdown.value = "name"; // Set dropdown value to "Name"
      renderTable("name"); // Render the table sorted by "Name"
      //console.log("Default order set to 'Name'.");
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
    alert("Invalid password or unable to fetch data.");
  }
}

// Fetch and decrypt the data using Web Crypto API
async function fetchAndDecryptData(password: string): Promise<void> {
  const response = await fetch("data/data.json.enc");
  if (!response.ok) throw new Error("Failed to fetch encrypted data");

  const encryptedData = await response.json();
  //console.log("Encrypted Data:", encryptedData);

  const { salt, iv, ciphertext, tag } = encryptedData;

  // Decode Base64-encoded values
  const decodedSalt = Uint8Array.from(atob(salt), (c) => c.charCodeAt(0));
  const decodedIV = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));
  const decodedCiphertext = Uint8Array.from(atob(ciphertext), (c) =>
    c.charCodeAt(0)
  );
  const decodedTag = Uint8Array.from(atob(tag), (c) => c.charCodeAt(0));

  // Derive the encryption key
  const key = await deriveKey(password, decodedSalt);

  // Combine ciphertext and tag (GCM expects them together)
  const combinedCiphertext = new Uint8Array([
    ...decodedCiphertext,
    ...decodedTag,
  ]);

  // Decrypt the data
  const decryptedData = await decryptData(key, decodedIV, combinedCiphertext);
  const data: Person[] = JSON.parse(new TextDecoder().decode(decryptedData));

  //console.log("Decrypted Data:", data);

  // Validate and sanitize fetched data
  people = data.map((person) => ({
    ...person,
    DOB: person.DOB || "1970-01-01", // Ensure valid DOB
    TOB: person.TOB || "00:00", // Default TOB to "00:00"
  }));

  //console.log("Sanitized Data:", people);
}

// Derive encryption key from password and salt
async function deriveKey(
  password: string,
  salt: Uint8Array
): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
}

// Decrypt the data
async function decryptData(
  key: CryptoKey,
  iv: Uint8Array,
  data: Uint8Array
): Promise<ArrayBuffer> {
  return crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    data
  );
}

// Render the table
function renderTable(order: "name" | "calendar" | "age"): void {
  const table = document.getElementById("people-table") as HTMLTableElement;
  table.innerHTML = "";

  // Add table headers
  const headerRow = table.insertRow();
  const headers = ["Naam", "Geboorte Datum/Tyd", "Ouderdom"];
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });

  // Sort data based on the selected order
  people.sort((a, b) => {
    if (order === "name") return a.name.localeCompare(b.name);
    if (order === "calendar") {
      const [monthA, dayA] = a.DOB.split("-").slice(1).map(Number);
      const [monthB, dayB] = b.DOB.split("-").slice(1).map(Number);
      return monthA === monthB ? dayA - dayB : monthA - monthB;
    }
    if (order === "age") {
      return (
        calculateAgeInSeconds(b.DOB, b.TOB!) -
        calculateAgeInSeconds(a.DOB, a.TOB!)
      );
    }
    return 0;
  });

  //console.log("Sorted people array:", people); // Debugging

  // Populate table
  people.forEach((person) => {
    const row = table.insertRow();
    row.insertCell(0).textContent = person.name || "Unknown";
    const dobCell = row.insertCell(1);
    dobCell.innerHTML = person.DOB
      ? `${person.DOB} <br>
        ${person.TOB}`
      : "Missing Data";
    const counterCell = row.insertCell(2);
    const counter = document.createElement("span");
    counterCell.appendChild(counter);
    person.ageCounter = counter;
  });

  updateCounters();
}

// Calculate age dynamically
function calculateAge(
  DOB: string,
  TOB: string
): { years: number; months: number; days: number } {
  const now = new Date();
  const [hours, minutes] = TOB.split(":").map(Number);
  const birthDate = new Date(DOB);
  birthDate.setHours(hours, minutes, 0, 0);

  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of previous month
    days += previousMonth.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days };
}

// Calculate age in seconds
function calculateAgeInSeconds(DOB: string, TOB: string): number {
  if (!DOB) return 0; // Default to 0 seconds if `DOB` is missing
  const now = new Date();
  const [hours, minutes] = TOB.split(":").map(Number);
  const birthDate = new Date(DOB);
  birthDate.setHours(hours, minutes, 0, 0); // Set Time of Birth
  return Math.floor((now.getTime() - birthDate.getTime()) / 1000);
}

// Update counters dynamically
function updateCounters(): void {
  setInterval(() => {
    people.forEach((person) => {
      if (person.ageCounter) {
        const seconds = calculateAgeInSeconds(person.DOB, person.TOB!);
        const { years, months, days } = calculateAge(person.DOB, person.TOB!);
        const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        const secs = seconds % 60;
        person.ageCounter.innerHTML = `
            <span style="font-size: 1.2em; font-weight: bold;">
            ${years}</span> <br>
            ${months} maande <br>
            ${days} dae <br>
            ${hours} ure <br>
            ${minutes} minute <br> 
            ${secs} sekondes`;
      }
    });
  }, 1000);
}

// Event listener for dropdown
document.getElementById("sort-order")?.addEventListener("change", (e) => {
  const order = (e.target as HTMLSelectElement).value as
    | "name"
    | "calendar"
    | "age";
  //console.log("Sort order changed to:", order); // Debugging
  renderTable(order); // Render table with the selected order
});

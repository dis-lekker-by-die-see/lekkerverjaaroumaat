type Person = {
  name: string;
  dob: string; // Date of Birth in "YYYY-MM-DD" format
  tob: string; // Time of Birth in "HH:mm" format
  ageCounter?: HTMLElement;
};

// Active list of people
let people: Person[] = [];

// Fetch and decrypt the data
async function fetchData(password: string): Promise<void> {
  const response = await fetch("decrypt.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) throw new Error("Failed to fetch data");

  const data: Person[] = await response.json();
  people = data;

  renderTable();
}

// Render the table
function renderTable(order: "name" | "dob" | "age" = "name"): void {
  const table = document.getElementById("people-table") as HTMLTableElement;
  table.innerHTML = "";

  // Sort data based on the selected order
  people.sort((a, b) => {
    if (order === "name") return a.name.localeCompare(b.name);
    if (order === "dob")
      return (
        new Date(`${a.dob}T${a.tob}`).getTime() -
        new Date(`${b.dob}T${b.tob}`).getTime()
      );
    if (order === "age")
      return getAgeInSeconds(b.dob, b.tob) - getAgeInSeconds(a.dob, a.tob);
    return 0;
  });

  // Populate table
  people.forEach((person) => {
    const row = table.insertRow();
    row.insertCell(0).textContent = person.name;
    row.insertCell(1).textContent = `${person.dob} ${person.tob}`;
    const counterCell = row.insertCell(2);
    const counter = document.createElement("span");
    counterCell.appendChild(counter);
    person.ageCounter = counter;
  });

  updateCounters();
}

// Calculate age in seconds
function getAgeInSeconds(dob: string, tob: string): number {
  const now = new Date();
  const [hours, minutes] = tob.split(":").map(Number);
  const birthDate = new Date(dob);
  birthDate.setHours(hours, minutes, 0, 0); // Set Time of Birth
  return Math.floor((now.getTime() - birthDate.getTime()) / 1000);
}

// Update counters dynamically
function updateCounters(): void {
  setInterval(() => {
    people.forEach((person) => {
      if (person.ageCounter) {
        const seconds = getAgeInSeconds(person.dob, person.tob);
        const years = Math.floor(seconds / (365 * 24 * 60 * 60));
        const months = Math.floor(
          (seconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60)
        );
        const days = Math.floor(
          (seconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60)
        );
        const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        const secs = seconds % 60;

        person.ageCounter.textContent = `${years}y ${months}m ${days}d ${hours}h ${minutes}m ${secs}s`;
      }
    });
  }, 1000);
}

// Event listener for dropdown
document.getElementById("sort-order")?.addEventListener("change", (e) => {
  const order = (e.target as HTMLSelectElement).value as "name" | "dob" | "age";
  renderTable(order);
});

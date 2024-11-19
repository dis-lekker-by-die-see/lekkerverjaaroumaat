// // // // type Person = {
// // // //   name: string;
// // // //   dob: string; // Date of Birth in "YYYY-MM-DD" format
// // // //   TOB: string; // Time of Birth in "HH:mm" format
// // // //   ageCounter?: HTMLElement;
// // // // };

// // // // // Active list of people
// // // // let people: Person[] = [];

// // // // // Fetch and decrypt the data
// // // // async function fetchData(password: string): Promise<void> {
// // // //   const response = await fetch("decrypt.php", {
// // // //     method: "POST",
// // // //     headers: { "Content-Type": "application/json" },
// // // //     body: JSON.stringify({ password }),
// // // //   });

// // // //   if (!response.ok) throw new Error("Failed to fetch data");

// // // //   const data: Person[] = await response.json();
// // // //   people = data;

// // // //   renderTable();
// // // // }

// // // // // Render the table
// // // // function renderTable(order: "name" | "dob" | "age" = "name"): void {
// // // //   const table = document.getElementById("people-table") as HTMLTableElement;
// // // //   table.innerHTML = "";

// // // //   // Sort data based on the selected order
// // // //   people.sort((a, b) => {
// // // //     if (order === "name") return a.name.localeCompare(b.name);
// // // //     if (order === "dob")
// // // //       return (
// // // //         new Date(`${a.dob}T${a.TOB}`).getTime() -
// // // //         new Date(`${b.dob}T${b.TOB}`).getTime()
// // // //       );
// // // //     if (order === "age")
// // // //       return getAgeInSeconds(b.dob, b.TOB) - getAgeInSeconds(a.dob, a.TOB);
// // // //     return 0;
// // // //   });

// // // //   // Populate table
// // // //   people.forEach((person) => {
// // // //     const row = table.insertRow();
// // // //     row.insertCell(0).textContent = person.name;
// // // //     row.insertCell(1).textContent = `${person.dob} ${person.TOB}`;
// // // //     const counterCell = row.insertCell(2);
// // // //     const counter = document.createElement("span");
// // // //     counterCell.appendChild(counter);
// // // //     person.ageCounter = counter;
// // // //   });

// // // //   updateCounters();
// // // // }

// // // // // Calculate age in seconds
// // // // function getAgeInSeconds(dob: string, TOB: string): number {
// // // //   const now = new Date();
// // // //   const [hours, minutes] = TOB.split(":").map(Number);
// // // //   const birthDate = new Date(dob);
// // // //   birthDate.setHours(hours, minutes, 0, 0); // Set Time of Birth
// // // //   return Math.floor((now.getTime() - birthDate.getTime()) / 1000);
// // // // }

// // // // // Update counters dynamically
// // // // function updateCounters(): void {
// // // //   setInterval(() => {
// // // //     people.forEach((person) => {
// // // //       if (person.ageCounter) {
// // // //         const seconds = getAgeInSeconds(person.dob, person.TOB);
// // // //         const years = Math.floor(seconds / (365 * 24 * 60 * 60));
// // // //         const months = Math.floor(
// // // //           (seconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60)
// // // //         );
// // // //         const days = Math.floor(
// // // //           (seconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60)
// // // //         );
// // // //         const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
// // // //         const minutes = Math.floor((seconds % (60 * 60)) / 60);
// // // //         const secs = seconds % 60;

// // // //         person.ageCounter.textContent = `${years}y ${months}m ${days}d ${hours}h ${minutes}m ${secs}s`;
// // // //       }
// // // //     });
// // // //   }, 1000);
// // // // }

// // // // // Event listener for dropdown
// // // // document.getElementById("sort-order")?.addEventListener("change", (e) => {
// // // //   const order = (e.target as HTMLSelectElement).value as "name" | "dob" | "age";
// // // //   renderTable(order);
// // // // });

// // // type Person = {
// // //   name: string;
// // //   DOB: string; // Date of Birth in "YYYY-MM-DD" format
// // //   TOB?: string; // Time of Birth in "HH:mm" format (optional)
// // //   ageCounter?: HTMLElement;
// // // };

// // // // Active list of people
// // // let people: Person[] = [];

// // // // Fetch and decrypt the data
// // // // async function fetchData(password: string): Promise<void> {
// // // //   const response = await fetch("decrypt.php", {
// // // //     method: "POST",
// // // //     headers: { "Content-Type": "application/json" },
// // // //     body: JSON.stringify({ password }),
// // // //   });

// // // //   if (!response.ok) throw new Error("Failed to fetch data");

// // // //   const data: Person[] = await response.json();

// // // //   // Assign default "00:00" to any missing or undefined `TOB`
// // // //   people = data.map((person) => ({
// // // //     ...person,
// // // //     TOB: person.TOB || "00:00", // Ensure `TOB` is never undefined
// // // //   }));

// // // //   console.log("Fetched Data:", data);

// // // //   renderTable();
// // // // }
// // // //////////////
// // // // async function fetchData(password: string): Promise<void> {
// // // //   const response = await fetch("decrypt.php", {
// // // //     method: "POST",
// // // //     headers: { "Content-Type": "application/json" },
// // // //     body: JSON.stringify({ password }),
// // // //   });

// // // //   if (!response.ok) throw new Error("Failed to fetch data");

// // // //   const data: Person[] = await response.json();

// // // //   console.log("Raw Data from decrypt.php:", data);

// // // //   // Validate and sanitize fetched data
// // // //   people = data
// // // //     .filter((person) => person.dob) // Skip entries without a valid `dob`
// // // //     .map((person) => ({
// // // //       name: person.name,
// // // //       dob: person.dob || "1970-01-01", // Default DOB if missing
// // // //       TOB: person.TOB || "00:00", // Default TOB if missing
// // // //     }));

// // // //   console.log("Sanitized Data:", people); // Debug sanitized data
// // // //   renderTable();
// // // // }
// // // /////-----////////
// // // async function fetchData(password: string): Promise<void> {
// // //   const response = await fetch("decrypt.php", {
// // //     method: "POST",
// // //     headers: { "Content-Type": "application/json" },
// // //     body: JSON.stringify({ password }),
// // //   });

// // //   if (!response.ok) throw new Error("Failed to fetch data");

// // //   const data: Person[] = await response.json();
// // //   console.log("Raw Data from decrypt.php:", data);

// // //   // Use the backend fields directly without mapping
// // //   people = data.map((person) => ({
// // //     ...person,
// // //     DOB: person.DOB || "1970-01-01", // Use `DOB` directly
// // //     TOB: person.TOB || "00:00", // Use `TOB` directly
// // //   }));

// // //   console.log("Sanitized Data:", people); // Debug sanitized data
// // //   renderTable();
// // // }

// // // //////-----///////

// // // ///////////

// // // // Render the table
// // // // function renderTable(order: "name" | "DOB" | "age" = "name"): void {
// // // //   const table = document.getElementById("people-table") as HTMLTableElement;
// // // //   table.innerHTML = "";

// // // //   // Sort data based on the selected order
// // // //   people.sort((a, b) => {
// // // //     if (order === "name") return a.name.localeCompare(b.name);
// // // //     if (order === "DOB") {
// // // //       const dateA = new Date(`${a.DOB}T${a.TOB}`);
// // // //       const dateB = new Date(`${b.DOB}T${b.TOB}`);
// // // //       return dateA.getTime() - dateB.getTime();
// // // //     }
// // // //     if (order === "age") {
// // // //       return getAgeInSeconds(b.DOB, b.TOB!) - getAgeInSeconds(a.DOB, a.TOB!);
// // // //     }
// // // //     return 0;
// // // //   });

// // // //   // Populate table
// // // //   people.forEach((person) => {
// // // //     const row = table.insertRow();
// // // //     row.insertCell(0).textContent = person.name;
// // // //     row.insertCell(1).textContent = `${person.DOB} ${person.TOB}`;
// // // //     const counterCell = row.insertCell(2);
// // // //     const counter = document.createElement("span");
// // // //     counterCell.appendChild(counter);
// // // //     person.ageCounter = counter;
// // // //   });

// // // //   updateCounters();
// // // // }

// // // ////////////
// // // // function renderTable(order: "name" | "DOB" | "age" = "name"): void {
// // // //   const table = document.getElementById("people-table") as HTMLTableElement;
// // // //   table.innerHTML = "";

// // // //   // Sort data based on the selected order
// // // //   people.sort((a, b) => {
// // // //     if (order === "name") return a.name.localeCompare(b.name);
// // // //     if (order === "DOB") {
// // // //       const dateA = new Date(`${a.DOB}T${a.TOB}`);
// // // //       const dateB = new Date(`${b.DOB}T${b.TOB}`);
// // // //       return dateA.getTime() - dateB.getTime();
// // // //     }
// // // //     if (order === "age") {
// // // //       return getAgeInSeconds(b.DOB, b.TOB!) - getAgeInSeconds(a.DOB, a.TOB!);
// // // //     }
// // // //     return 0;
// // // //   });

// // // //   // Populate table
// // // //   people.forEach((person) => {
// // // //     const row = table.insertRow();
// // // //     row.insertCell(0).textContent = person.name || "Unknown";
// // // //     row.insertCell(1).textContent = person.DOB
// // // //       ? `${person.DOB} ${person.TOB}`
// // // //       : "Missing Data";
// // // //     const counterCell = row.insertCell(2);
// // // //     const counter = document.createElement("span");
// // // //     counterCell.appendChild(counter);
// // // //     person.ageCounter = counter;
// // // //   });

// // // //   updateCounters();
// // // // }

// // // //////----/////

// // // // function renderTable(order: "name" | "calendar" | "age" = "name"): void {
// // // //   const table = document.getElementById("people-table") as HTMLTableElement;
// // // //   table.innerHTML = "";

// // // //   // Sort data based on the selected order
// // // //   people.sort((a, b) => {
// // // //     if (order === "name") return a.name.localeCompare(b.name);
// // // //     if (order === "calendar") {
// // // //       // Extract month and day from `DOB`
// // // //       const [monthA, dayA] = a.DOB.split("-").slice(1).map(Number);
// // // //       const [monthB, dayB] = b.DOB.split("-").slice(1).map(Number);

// // // //       return monthA === monthB ? dayA - dayB : monthA - monthB;
// // // //     }
// // // //     if (order === "age") {
// // // //       return getAgeInSeconds(b.DOB, b.TOB!) - getAgeInSeconds(a.DOB, a.TOB!);
// // // //     }
// // // //     return 0;
// // // //   });

// // // //   console.log("Sorted people array:", people); // Debugging

// // // //   // Populate table
// // // //   people.forEach((person) => {
// // // //     const row = table.insertRow();
// // // //     row.insertCell(0).textContent = person.name || "Unknown";
// // // //     row.insertCell(1).textContent = person.DOB
// // // //       ? `${person.DOB} ${person.TOB}`
// // // //       : "Missing Data";
// // // //     const counterCell = row.insertCell(2);
// // // //     const counter = document.createElement("span");
// // // //     counterCell.appendChild(counter);
// // // //     person.ageCounter = counter;
// // // //   });

// // // //   updateCounters();
// // // // }
// // // ////----////

// // // ///__________________
// // // function renderTable(order: "name" | "calendar" | "age" = "name"): void {
// // //   const table = document.getElementById("people-table") as HTMLTableElement;
// // //   table.innerHTML = "";

// // //   // Sort data based on the selected order
// // //   people.sort((a, b) => {
// // //     if (order === "name") return a.name.localeCompare(b.name);
// // //     if (order === "calendar") {
// // //       const [monthA, dayA] = a.DOB.split("-").slice(1).map(Number);
// // //       const [monthB, dayB] = b.DOB.split("-").slice(1).map(Number);
// // //       return monthA === monthB ? dayA - dayB : monthA - monthB;
// // //     }
// // //     if (order === "age") {
// // //       return getAgeInSeconds(b.DOB, b.TOB!) - getAgeInSeconds(a.DOB, a.TOB!);
// // //     }
// // //     return 0;
// // //   });

// // //   console.log("Sorted people array:", people); // Debugging

// // //   // Populate table
// // //   people.forEach((person) => {
// // //     const row = table.insertRow();
// // //     row.insertCell(0).textContent = person.name || "Unknown";
// // //     row.insertCell(1).textContent = person.DOB
// // //       ? `${person.DOB} ${person.TOB}`
// // //       : "Missing Data";
// // //     const counterCell = row.insertCell(2);
// // //     const counter = document.createElement("span");
// // //     counterCell.appendChild(counter);
// // //     person.ageCounter = counter;
// // //   });

// // //   updateCounters();
// // // }
// // // ///____________________

// // // ////////////

// // // // Calculate age in seconds
// // // // function getAgeInSeconds(DOB: string, TOB: string): number {
// // // //   const now = new Date();
// // // //   const [hours, minutes] = TOB.split(":").map(Number);
// // // //   const birthDate = new Date(DOB);
// // // //   birthDate.setHours(hours, minutes, 0, 0); // Set Time of Birth
// // // //   return Math.floor((now.getTime() - birthDate.getTime()) / 1000);
// // // // }

// // // ///////////
// // // //
// // // function getAgeInSeconds(DOB: string, TOB: string): number {
// // //   if (!DOB) return 0; // Default to 0 seconds if `DOB` is missing
// // //   const now = new Date();
// // //   const [hours, minutes] = TOB.split(":").map(Number);
// // //   const birthDate = new Date(DOB);
// // //   birthDate.setHours(hours, minutes, 0, 0); // Set Time of Birth
// // //   return Math.floor((now.getTime() - birthDate.getTime()) / 1000);
// // // }
// // // /////////////

// // // // Update counters dynamically
// // // function updateCounters(): void {
// // //   setInterval(() => {
// // //     people.forEach((person) => {
// // //       if (person.ageCounter) {
// // //         const seconds = getAgeInSeconds(person.DOB, person.TOB!);
// // //         const years = Math.floor(seconds / (365 * 24 * 60 * 60));
// // //         const months = Math.floor(
// // //           (seconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60)
// // //         );
// // //         const days = Math.floor(
// // //           (seconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60)
// // //         );
// // //         const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
// // //         const minutes = Math.floor((seconds % (60 * 60)) / 60);
// // //         const secs = seconds % 60;

// // //         person.ageCounter.textContent = `${years}y ${months}m ${days}d ${hours}h ${minutes}m ${secs}s`;
// // //       }
// // //     });
// // //   }, 1000);
// // // }

// // // // // Event listener for dropdown
// // // // document.getElementById("sort-order")?.addEventListener("change", (e) => {
// // // //   const order = (e.target as HTMLSelectElement).value as
// // // //     | "name"
// // // //     | "calendar"
// // // //     | "age";
// // // //   console.log("Sort order changed to:", order); // Debugging
// // // //   renderTable(order);
// // // // });

// // // document.getElementById("sort-order")?.addEventListener("change", (e) => {
// // //   const order = (e.target as HTMLSelectElement).value as
// // //     | ""
// // //     | "name"
// // //     | "calendar"
// // //     | "age";

// // //   if (order === "") {
// // //     // Clear the table if "Select Order" is chosen
// // //     const table = document.getElementById("people-table") as HTMLTableElement;
// // //     table.innerHTML = ""; // Empty the table
// // //     console.log("No order selected."); // Debugging
// // //     return;
// // //   }

// // //   console.log("Sort order changed to:", order); // Debugging
// // //   renderTable(order); // Render table with the selected order
// // // });

// // type Person = {
// //   name: string;
// //   DOB: string; // Date of Birth in "YYYY-MM-DD" format
// //   TOB?: string; // Time of Birth in "HH:mm" format (optional)
// //   ageCounter?: HTMLElement;
// // };

// // // Active list of people
// // let people: Person[] = [];

// // ////
// // // Attach event listener to the Submit button
// // document
// //   .getElementById("submit-button")
// //   ?.addEventListener("click", async () => {
// //     await submitPassword();
// //   });

// // async function submitPassword(): Promise<void> {
// //   console.log("Submit button clicked!"); // Debugging
// //   const password = (document.getElementById("password") as HTMLInputElement)
// //     .value;

// //   try {
// //     await fetchData(password); // Fetch and decrypt the data

// //     // Show the dropdown menu
// //     const dropdownWrapper = document.getElementById("dropdown-wrapper");
// //     if (dropdownWrapper) dropdownWrapper.style.display = "block";

// //     // Automatically select "Name" as the default order
// //     const dropdown = document.getElementById("sort-order") as HTMLSelectElement;
// //     if (dropdown) {
// //       dropdown.value = "name"; // Set dropdown value to "Name"
// //       renderTable("name"); // Render the table sorted by "Name"
// //       console.log("Default order set to 'Name'.");
// //     }

// //     console.log(
// //       "Password submitted successfully. Select an order to display the table."
// //     );
// //   } catch (error) {
// //     console.error("Failed to fetch data:", error);
// //     alert("Invalid password or unable to fetch data.");
// //   }
// // }

// // //////////

// // // Fetch and decrypt the data
// // async function fetchData(password: string): Promise<void> {
// //   const response = await fetch("decrypt.php", {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({ password }),
// //   });

// //   if (!response.ok) throw new Error("Failed to fetch data");

// //   const data: Person[] = await response.json();
// //   console.log("Raw Data from decrypt.php:", data);

// //   // Validate and sanitize fetched data
// //   people = data.map((person) => ({
// //     ...person,
// //     DOB: person.DOB || "1970-01-01", // Ensure valid DOB
// //     TOB: person.TOB || "00:00", // Default TOB to "00:00"
// //   }));

// //   console.log("Sanitized Data:", people); // Debug sanitized data
// // }

// // // Render the table
// // function renderTable(order: "name" | "calendar" | "age"): void {
// //   const table = document.getElementById("people-table") as HTMLTableElement;
// //   table.innerHTML = "";

// //   // Sort data based on the selected order
// //   people.sort((a, b) => {
// //     if (order === "name") return a.name.localeCompare(b.name);
// //     if (order === "calendar") {
// //       const [monthA, dayA] = a.DOB.split("-").slice(1).map(Number);
// //       const [monthB, dayB] = b.DOB.split("-").slice(1).map(Number);
// //       return monthA === monthB ? dayA - dayB : monthA - monthB;
// //     }
// //     if (order === "age") {
// //       return getAgeInSeconds(b.DOB, b.TOB!) - getAgeInSeconds(a.DOB, a.TOB!);
// //     }
// //     return 0;
// //   });

// //   console.log("Sorted people array:", people); // Debugging

// //   // Populate table
// //   people.forEach((person) => {
// //     const row = table.insertRow();
// //     row.insertCell(0).textContent = person.name || "Unknown";
// //     row.insertCell(1).textContent = person.DOB
// //       ? `${person.DOB} ${person.TOB}`
// //       : "Missing Data";
// //     const counterCell = row.insertCell(2);
// //     const counter = document.createElement("span");
// //     counterCell.appendChild(counter);
// //     person.ageCounter = counter;
// //   });

// //   updateCounters();
// // }

// // // Calculate age in seconds
// // function getAgeInSeconds(DOB: string, TOB: string): number {
// //   if (!DOB) return 0; // Default to 0 seconds if `DOB` is missing
// //   const now = new Date();
// //   const [hours, minutes] = TOB.split(":").map(Number);
// //   const birthDate = new Date(DOB);
// //   birthDate.setHours(hours, minutes, 0, 0); // Set Time of Birth
// //   return Math.floor((now.getTime() - birthDate.getTime()) / 1000);
// // }

// // // Update counters dynamically
// // function updateCounters(): void {
// //   setInterval(() => {
// //     people.forEach((person) => {
// //       if (person.ageCounter) {
// //         const seconds = getAgeInSeconds(person.DOB, person.TOB!);
// //         const years = Math.floor(seconds / (365 * 24 * 60 * 60));
// //         const months = Math.floor(
// //           (seconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60)
// //         );
// //         const days = Math.floor(
// //           (seconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60)
// //         );
// //         const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
// //         const minutes = Math.floor((seconds % (60 * 60)) / 60);
// //         const secs = seconds % 60;

// //         person.ageCounter.textContent = `${years}y ${months}m ${days}d ${hours}h ${minutes}m ${secs}s`;
// //       }
// //     });
// //   }, 1000);
// // }

// // // Event listener for dropdown
// // document.getElementById("sort-order")?.addEventListener("change", (e) => {
// //   const order = (e.target as HTMLSelectElement).value as  //| ""|
// //     | "name"
// //     | "calendar"
// //     | "age";

// //   //   if (order === "") {
// //   //     const table = document.getElementById("people-table") as HTMLTableElement;
// //   //     table.innerHTML = ""; // Empty the table
// //   //     console.log("No order selected."); // Debugging
// //   //     return;
// //   //   }

// //   console.log("Sort order changed to:", order); // Debugging
// //   renderTable(order); // Render table with the selected order
// // });
//__________________________________________________________________________________
// type Person = {
//   name: string;
//   DOB: string; // Date of Birth in "YYYY-MM-DD" format
//   TOB?: string; // Time of Birth in "HH:mm" format (optional)
//   ageCounter?: HTMLElement;
// };

// // Active list of people
// let people: Person[] = [];

// // Attach event listener to the Submit button
// document
//   .getElementById("submit-button")
//   ?.addEventListener("click", async () => {
//     await submitPassword();
//   });

// // Submit button handler
// async function submitPassword(): Promise<void> {
//   console.log("Submit button clicked!"); // Debugging
//   const password = (document.getElementById("password") as HTMLInputElement)
//     .value;

//   try {
//     await fetchData(password); // Fetch and decrypt the data

//     // Show the dropdown menu
//     const dropdownWrapper = document.getElementById("dropdown-wrapper");
//     if (dropdownWrapper) dropdownWrapper.style.display = "block";

//     // Automatically select "Name" as the default order
//     const dropdown = document.getElementById("sort-order") as HTMLSelectElement;
//     if (dropdown) {
//       dropdown.value = "name"; // Set dropdown value to "Name"
//       renderTable("name"); // Render the table sorted by "Name"
//       console.log("Default order set to 'Name'.");
//     }

//     console.log(
//       "Password submitted successfully. Select an order to display the table."
//     );
//   } catch (error) {
//     console.error("Failed to fetch data:", error);
//     alert("Invalid password or unable to fetch data.");
//   }
// }

// // Fetch and decrypt the data
// async function fetchData(password: string): Promise<void> {
//   const response = await fetch("decrypt.php", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ password }),
//   });

//   if (!response.ok) throw new Error("Failed to fetch data");

//   const data: Person[] = await response.json();
//   console.log("Raw Data from decrypt.php:", data);

//   // Validate and sanitize fetched data
//   people = data.map((person) => ({
//     ...person,
//     DOB: person.DOB || "1970-01-01", // Ensure valid DOB
//     TOB: person.TOB || "00:00", // Default TOB to "00:00"
//   }));

//   console.log("Sanitized Data:", people); // Debug sanitized data
// }

// // Render the table
// // function renderTable(order: "name" | "calendar" | "age"): void {
// //   const table = document.getElementById("people-table") as HTMLTableElement;
// //   table.innerHTML = "";

// //   // Sort data based on the selected order
// //   people.sort((a, b) => {
// //     if (order === "name") return a.name.localeCompare(b.name);
// //     if (order === "calendar") {
// //       const [monthA, dayA] = a.DOB.split("-").slice(1).map(Number);
// //       const [monthB, dayB] = b.DOB.split("-").slice(1).map(Number);
// //       return monthA === monthB ? dayA - dayB : monthA - monthB;
// //     }
// //     if (order === "age") {
// //       return (
// //         calculateAgeInSeconds(b.DOB, b.TOB!) -
// //         calculateAgeInSeconds(a.DOB, a.TOB!)
// //       );
// //     }
// //     return 0;
// //   });

// //   console.log("Sorted people array:", people); // Debugging

// //   // Populate table
// //   people.forEach((person) => {
// //     const row = table.insertRow();
// //     row.insertCell(0).textContent = person.name || "Unknown";
// //     row.insertCell(1).textContent = person.DOB
// //       ? `Gebore op ${person.DOB} <br>om ${person.TOB}`
// //       : "Missing Data";
// //     const counterCell = row.insertCell(2);
// //     const counter = document.createElement("span");
// //     counterCell.appendChild(counter);
// //     person.ageCounter = counter;
// //   });

// //   updateCounters();
// // }
// function renderTable(order: "name" | "calendar" | "age"): void {
//   const table = document.getElementById("people-table") as HTMLTableElement;
//   table.innerHTML = "";

//   // Sort data based on the selected order
//   people.sort((a, b) => {
//     if (order === "name") return a.name.localeCompare(b.name);
//     if (order === "calendar") {
//       const [monthA, dayA] = a.DOB.split("-").slice(1).map(Number);
//       const [monthB, dayB] = b.DOB.split("-").slice(1).map(Number);
//       return monthA === monthB ? dayA - dayB : monthA - monthB;
//     }
//     if (order === "age") {
//       return (
//         calculateAgeInSeconds(b.DOB, b.TOB!) -
//         calculateAgeInSeconds(a.DOB, a.TOB!)
//       );
//     }
//     return 0;
//   });

//   console.log("Sorted people array:", people); // Debugging

//   // Populate table
//   people.forEach((person) => {
//     const row = table.insertRow();
//     row.insertCell(0).textContent = person.name || "Unknown";
//     const dobCell = row.insertCell(1);
//     dobCell.innerHTML = person.DOB
//       ? `Gebore op ${person.DOB} <br>om ${person.TOB}`
//       : "Missing Data";
//     const counterCell = row.insertCell(2);
//     const counter = document.createElement("span");
//     counterCell.appendChild(counter);
//     person.ageCounter = counter;
//   });

//   updateCounters();
// }

// // Calculate age dynamically
// function calculateAge(
//   DOB: string,
//   TOB: string
// ): { years: number; months: number; days: number } {
//   const now = new Date();
//   const [hours, minutes] = TOB.split(":").map(Number);
//   const birthDate = new Date(DOB);
//   birthDate.setHours(hours, minutes, 0, 0);

//   let years = now.getFullYear() - birthDate.getFullYear();
//   let months = now.getMonth() - birthDate.getMonth();
//   let days = now.getDate() - birthDate.getDate();

//   if (days < 0) {
//     const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of previous month
//     days += previousMonth.getDate();
//     months -= 1;
//   }

//   if (months < 0) {
//     months += 12;
//     years -= 1;
//   }

//   return { years, months, days };
// }

// // Calculate age in seconds
// function calculateAgeInSeconds(DOB: string, TOB: string): number {
//   if (!DOB) return 0; // Default to 0 seconds if `DOB` is missing
//   const now = new Date();
//   const [hours, minutes] = TOB.split(":").map(Number);
//   const birthDate = new Date(DOB);
//   birthDate.setHours(hours, minutes, 0, 0); // Set Time of Birth
//   return Math.floor((now.getTime() - birthDate.getTime()) / 1000);
// }

// // Update counters dynamically
// // function updateCounters(): void {
// //   setInterval(() => {
// //     people.forEach((person) => {
// //       if (person.ageCounter) {
// //         const seconds = calculateAgeInSeconds(person.DOB, person.TOB!);
// //         const { years, months, days } = calculateAge(person.DOB, person.TOB!);
// //         const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
// //         const minutes = Math.floor((seconds % (60 * 60)) / 60);
// //         const secs = seconds % 60;

// //         person.ageCounter.textContent = `${years} Jaar, ${months} maande, ${days} dae ${hours} ure, ${minutes} minute, en ${secs} sekondes`;
// //       }
// //     });
// //   }, 1000);
// // }

// function updateCounters(): void {
//   setInterval(() => {
//     people.forEach((person) => {
//       if (person.ageCounter) {
//         const seconds = calculateAgeInSeconds(person.DOB, person.TOB!);
//         const { years, months, days } = calculateAge(person.DOB, person.TOB!);
//         const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
//         const minutes = Math.floor((seconds % (60 * 60)) / 60);
//         const secs = seconds % 60;

//         person.ageCounter.innerHTML = `
//             ${years} Jaar, ${months} maande, ${days} dae
//             <br>${hours} ure, ${minutes} minute, en ${secs} sekondes
//           `;
//       }
//     });
//   }, 1000);
// }

// // Event listener for dropdown
// document.getElementById("sort-order")?.addEventListener("change", (e) => {
//   const order = (e.target as HTMLSelectElement).value as
//     | "name"
//     | "calendar"
//     | "age";
//   console.log("Sort order changed to:", order); // Debugging
//   renderTable(order); // Render table with the selected order
// });

type Person = {
  name: string;
  DOB: string; // Date of Birth in "YYYY-MM-DD" format
  TOB?: string; // Time of Birth in "HH:mm" format (optional)
  ageCounter?: HTMLElement;
};

// Active list of people
let people: Person[] = [];

// Attach event listener to the Submit button
document
  .getElementById("submit-button")
  ?.addEventListener("click", async () => {
    await submitPassword();
  });

// Submit button handler
async function submitPassword(): Promise<void> {
  console.log("Submit button clicked!"); // Debugging
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;

  try {
    await fetchData(password); // Fetch and decrypt the data

    // Hide the password input and submit button
    const loginSection = document.getElementById("login-section");
    if (loginSection) loginSection.style.display = "none";

    // const passwordInput = document.getElementById("password");
    // const submitButton = document.getElementById("submit-button");
    // if (passwordInput) passwordInput.style.display = "none";
    // if (submitButton) submitButton.style.display = "none";

    // Show the dropdown menu
    const dropdownWrapper = document.getElementById("dropdown-wrapper");
    if (dropdownWrapper) dropdownWrapper.style.display = "block";

    // // Automatically select "Name" as the default order
    // renderTable("name"); // Render the table sorted by "Name"

    // Automatically select "Name" as the default order
    const dropdown = document.getElementById("sort-order") as HTMLSelectElement;
    if (dropdown) {
      dropdown.value = "name"; // Set dropdown value to "Name"
      renderTable("name"); // Render the table sorted by "Name"
      console.log("Default order set to 'Name'.");
    }
    // console.log("Default order set to 'Name'.");
  } catch (error) {
    console.error("Failed to fetch data:", error);
    alert("Invalid password or unable to fetch data.");
  }
}

// Fetch and decrypt the data
async function fetchData(password: string): Promise<void> {
  const response = await fetch("decrypt.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) throw new Error("Failed to fetch data");

  const data: Person[] = await response.json();
  console.log("Raw Data from decrypt.php:", data);

  // Validate and sanitize fetched data
  people = data.map((person) => ({
    ...person,
    DOB: person.DOB || "1970-01-01", // Ensure valid DOB
    TOB: person.TOB || "00:00", // Default TOB to "00:00"
  }));

  console.log("Sanitized Data:", people); // Debug sanitized data
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

  console.log("Sorted people array:", people); // Debugging

  // Populate table
  people.forEach((person) => {
    const row = table.insertRow();
    row.insertCell(0).textContent = person.name || "Unknown";
    const dobCell = row.insertCell(1);
    dobCell.innerHTML = person.DOB
      ? `${person.DOB} <br>${person.TOB}`
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
            ${years} Jaar, ${months} maande, ${days} dae
            <br>${hours} ure, ${minutes} minute, en ${secs} sekondes
          `;
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
  console.log("Sort order changed to:", order); // Debugging
  renderTable(order); // Render table with the selected order
});

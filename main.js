"use strict";
// // // // type Person = {
// // // //   name: string;
// // // //   dob: string; // Date of Birth in "YYYY-MM-DD" format
// // // //   TOB: string; // Time of Birth in "HH:mm" format
// // // //   ageCounter?: HTMLElement;
// // // // };
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
// Active list of people
let people = [];
// Attach event listener to the Submit button
(_a = document
    .getElementById("submit-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    yield submitPassword();
}));
// Submit button handler
function submitPassword() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Submit button clicked!"); // Debugging
        const password = document.getElementById("password")
            .value;
        try {
            yield fetchData(password); // Fetch and decrypt the data
            // Hide the password input and submit button
            const loginSection = document.getElementById("login-section");
            if (loginSection)
                loginSection.style.display = "none";
            // const passwordInput = document.getElementById("password");
            // const submitButton = document.getElementById("submit-button");
            // if (passwordInput) passwordInput.style.display = "none";
            // if (submitButton) submitButton.style.display = "none";
            // Show the dropdown menu
            const dropdownWrapper = document.getElementById("dropdown-wrapper");
            if (dropdownWrapper)
                dropdownWrapper.style.display = "block";
            // // Automatically select "Name" as the default order
            // renderTable("name"); // Render the table sorted by "Name"
            // Automatically select "Name" as the default order
            const dropdown = document.getElementById("sort-order");
            if (dropdown) {
                dropdown.value = "name"; // Set dropdown value to "Name"
                renderTable("name"); // Render the table sorted by "Name"
                console.log("Default order set to 'Name'.");
            }
            // console.log("Default order set to 'Name'.");
        }
        catch (error) {
            console.error("Failed to fetch data:", error);
            alert("Invalid password or unable to fetch data.");
        }
    });
}
// Fetch and decrypt the data
function fetchData(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("decrypt.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });
        if (!response.ok)
            throw new Error("Failed to fetch data");
        const data = yield response.json();
        console.log("Raw Data from decrypt.php:", data);
        // Validate and sanitize fetched data
        people = data.map((person) => (Object.assign(Object.assign({}, person), { DOB: person.DOB || "1970-01-01", TOB: person.TOB || "00:00" })));
        console.log("Sanitized Data:", people); // Debug sanitized data
    });
}
// Render the table
function renderTable(order) {
    const table = document.getElementById("people-table");
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
        if (order === "name")
            return a.name.localeCompare(b.name);
        if (order === "calendar") {
            const [monthA, dayA] = a.DOB.split("-").slice(1).map(Number);
            const [monthB, dayB] = b.DOB.split("-").slice(1).map(Number);
            return monthA === monthB ? dayA - dayB : monthA - monthB;
        }
        if (order === "age") {
            return (calculateAgeInSeconds(b.DOB, b.TOB) -
                calculateAgeInSeconds(a.DOB, a.TOB));
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
function calculateAge(DOB, TOB) {
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
function calculateAgeInSeconds(DOB, TOB) {
    if (!DOB)
        return 0; // Default to 0 seconds if `DOB` is missing
    const now = new Date();
    const [hours, minutes] = TOB.split(":").map(Number);
    const birthDate = new Date(DOB);
    birthDate.setHours(hours, minutes, 0, 0); // Set Time of Birth
    return Math.floor((now.getTime() - birthDate.getTime()) / 1000);
}
// Update counters dynamically
function updateCounters() {
    setInterval(() => {
        people.forEach((person) => {
            if (person.ageCounter) {
                const seconds = calculateAgeInSeconds(person.DOB, person.TOB);
                const { years, months, days } = calculateAge(person.DOB, person.TOB);
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
(_b = document.getElementById("sort-order")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", (e) => {
    const order = e.target.value;
    console.log("Sort order changed to:", order); // Debugging
    renderTable(order); // Render table with the selected order
});

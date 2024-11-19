"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
// Active list of people
let people = [];
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
        people = data;
        renderTable();
    });
}
// Render the table
function renderTable(order = "name") {
    const table = document.getElementById("people-table");
    table.innerHTML = "";
    // Sort data based on the selected order
    people.sort((a, b) => {
        if (order === "name")
            return a.name.localeCompare(b.name);
        if (order === "dob")
            return (new Date(`${a.dob}T${a.tob}`).getTime() -
                new Date(`${b.dob}T${b.tob}`).getTime());
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
function getAgeInSeconds(dob, tob) {
    const now = new Date();
    const [hours, minutes] = tob.split(":").map(Number);
    const birthDate = new Date(dob);
    birthDate.setHours(hours, minutes, 0, 0); // Set Time of Birth
    return Math.floor((now.getTime() - birthDate.getTime()) / 1000);
}
// Update counters dynamically
function updateCounters() {
    setInterval(() => {
        people.forEach((person) => {
            if (person.ageCounter) {
                const seconds = getAgeInSeconds(person.dob, person.tob);
                const years = Math.floor(seconds / (365 * 24 * 60 * 60));
                const months = Math.floor((seconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60));
                const days = Math.floor((seconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
                const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
                const minutes = Math.floor((seconds % (60 * 60)) / 60);
                const secs = seconds % 60;
                person.ageCounter.textContent = `${years}y ${months}m ${days}d ${hours}h ${minutes}m ${secs}s`;
            }
        });
    }, 1000);
}
// Event listener for dropdown
(_a = document.getElementById("sort-order")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", (e) => {
    const order = e.target.value;
    renderTable(order);
});

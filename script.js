const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRCB07pMA88ME-i7lnv5K8JkVbI1tzBI4Th7HRvuRzBXi8Esa0TTXctOMzpTenbOkrqKmcdimAztXLz/pub?gid=0&single=true&output=csv";

let quotes = [];

function loadCSV(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").slice(1); // Überspringe Header-Zeile
            quotes = rows.map(row => row.trim().replace(/^"|"$/g, "")).filter(q => q.length > 0);
            loadQuote(); // Zeige direkt ein erstes Zitat
        })
        .catch(error => {
            console.error("Fehler beim Laden der Zitate:", error);
            document.getElementById("quote-text").textContent = "Fehler beim Laden.";
        });
}

function loadQuote() {
    if (quotes.length === 0) {
        document.getElementById("quote-text").textContent = "Noch keine Zitate geladen.";
        return;
    }
    const index = Math.floor(Math.random() * quotes.length);
    document.getElementById("quote-text").textContent = quotes[index];
}

document.addEventListener("DOMContentLoaded", () => {
    loadCSV(csvUrl);
    document.querySelector("button").addEventListener("click", loadQuote);
});

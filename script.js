const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRCB07pMA88ME-i7lnv5K8JkVbI1tzBI4Th7HRvuRzBXi8Esa0TTXctOMzpTenbOkrqKmcdimAztXLz/pub?gid=0&single=true&output=csv";

let quotes = [];

const fonts = [
    "Georgia, serif",
    "'Segoe UI', sans-serif",
    "'Courier New', monospace",
    "'Lucida Handwriting', cursive",
    "'Comic Sans MS', cursive",
    "'Trebuchet MS', sans-serif",
    "'Arial Narrow', sans-serif",
    "'Palatino Linotype', serif"
];

function randomPastelColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 90%)`;
}

function randomFont() {
    const index = Math.floor(Math.random() * fonts.length);
    return fonts[index];
}

function applyRandomStyle() {
    document.body.style.backgroundColor = randomPastelColor();
    document.getElementById("quote-text").style.fontFamily = randomFont();
}

function loadCSV(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").slice(1);
            quotes = rows.map(row => row.trim().replace(/^"|"$/g, "")).filter(q => q.length > 0);
            loadQuote();
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
    applyRandomStyle();
}

document.addEventListener("DOMContentLoaded", () => {
    loadCSV(csvUrl);
});

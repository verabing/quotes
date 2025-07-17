const csvUrl = "https://docs.google.com/spreadsheets/d/1HsAU4gcJw2PVwr4xXQufjyaFlP1FWaLSOz5Wb6Fz07M/gviz/tq?tqx=out:csv";

let quotes = [];

function loadCSV(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").slice(1); // erste Zeile ist Header
            quotes = rows.map(row => row.trim()).filter(q => q.length > 0);
            loadQuote(); // direkt erstes Zitat anzeigen
        })
        .catch(error => {
            console.error("Fehler beim Laden:", error);
            document.getElementById("quote-text").textContent = "Fehler beim Laden der Zitate.";
        });
}

function loadQuote() {
    if (quotes.length === 0) {
        document.getElementById("quote-text").textContent = "Keine Zitate gefunden.";
        return;
    }
    const index = Math.floor(Math.random() * quotes.length);
    document.getElementById("quote-text").textContent = quotes[index];
}

// beim Start laden
loadCSV(csvUrl);

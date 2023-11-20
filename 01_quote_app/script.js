const btn = document.querySelector("#button");
btn.addEventListener("click", getQuotes);

const state = {
  randomQuote: [],
};

function getQuotes() {
  // folgende resource mit fetch laden
  fetch("https://dummy-apis.netlify.app/api/quote")
    // wenn es erfolgreich war dann mach folgendes mit .then und arrow-function
    // 1. fulfilled Callback mit response als Parameter
    // 2. auf Inhalt zugreifen
    // 2.1 auf HTML-Elemente zugreifen Zitat und Autor
    // 2.2 Zitat textContent mit jsonData.quote befüllen
    // 2.3
    .then((response) => response.json())
    .then((jsonData) => {
      // console.log(jsonData);
      state.randomQuote = jsonData.results;

      const quoteElement = document.querySelector("#quote");
      const authorElement = document.querySelector("#author");

      quoteElement.textContent = jsonData.quote;
      const authorName = document.createElement("p");
      authorName.textContent = jsonData.author;
      authorElement.innerHTML = ""; // Leere das vorhandene HTML, sonst werden die Autoren unteinander gelistet
      authorElement.appendChild(authorName); // Name in Element einfügen
    });
}

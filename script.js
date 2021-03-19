const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loading

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Show new Quote

function showNewQuote() {
  loading();
  //Pick random quote from apiQuotesarray

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Check if author field is blanck and replace it with "unknown"

  if (!quote.author) {
    authorText.textContent = "anonymous";
  } else {
    authorText.textContent = quote.author;
  }

  //Check quote length to determine styling

  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  //Set quote, Hide loader
  quoteText.textContent = quote.text;
  complete();
}

// GET quotes from API

async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    showNewQuote();
  } catch (error) {
    console.error(error);
  }
}

//Tweet quote

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", showNewQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on Load

getQuotes();

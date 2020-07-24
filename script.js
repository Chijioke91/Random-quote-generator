const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorName = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

// I didn't use this cos it had some errors
// const response = await fetch(
//   'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
// );

// show loading
function showLoader() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function removeLoader() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote
const getQuote = async () => {
  showLoader();

  try {
    const response = await fetch(
      'http://quotes.stormconsultancy.co.uk/random.json'
    );

    const data = await response.json();

    if (data.author) {
      authorName.innerText = data.author;
    } else {
      authorName.innerText = 'Unknown';
    }
    if (data.quote.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = data.quote;
    removeLoader();
  } catch (e) {
    getQuote();
  }
};

// tweet quote
const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorName.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}-${author}`;
  window.open(twitterUrl, '_blank');
};

// event listener for twitter button
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();

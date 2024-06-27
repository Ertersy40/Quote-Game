let quotes = [];
let currentQuote = {};
let score = 0;
let timer;
let timeLeft = 10;

async function fetchQuotes() {
    const response = await fetch('./quotes.json');
    quotes = await response.json();
    startGame();
}

function startGame() {
    score = 0;
    timeLeft = 10;
    document.getElementById('result').innerText = '';
    getRandomQuote();
    createButtons();
    startTimer();
}

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerText = currentQuote.quote;
}

function createButtons() {
    const buttonsContainer = document.getElementById('buttonsContainer');
    buttonsContainer.innerHTML = '';

    const names = [...new Set(quotes.map(quote => quote.name))];

    names.forEach(name => {
        const button = document.createElement('button');
        button.innerText = name;
        button.onclick = () => checkAnswer(name);
        buttonsContainer.appendChild(button);
    });
}

function checkAnswer(name) {
    clearInterval(timer);
    if (name === currentQuote.name) {
        score++;
        document.getElementById('result').innerText = `Correct! Score: ${score}`;
        document.getElementById('result').style.color = "green";
    } else {
        document.getElementById('gameOverResult').innerText = `Wrong! It was ${currentQuote.name}`;
        document.getElementById('result').innerText = `Wrong! It was ${currentQuote.name}`;
        document.getElementById('gameOverResult').style.color = "red";
        document.getElementById('result').style.color = "red";
        gameOver();
        score = 0;
        return;
    }
    getRandomQuote();
    resetTimer();
}

function startTimer() {
    timeLeft = 10;
    document.getElementById('timer').innerText = `Time left: ${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time left: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('gameOverResult').innerText = `Time up! It was ${currentQuote.name}`;
            document.getElementById('result').innerText = `Time up! It was ${currentQuote.name}`;
            document.getElementById('gameOverResult').style.color = "red";
            document.getElementById('result').style.color = "red";
            gameOver();
            score = 0;
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    startTimer();
}

function gameOver() {
    clearInterval(timer);
    document.getElementById('finalScore').innerText = score;
    document.getElementById('gameOverModal').style.display = "flex";
}

document.getElementById('closeModal').onclick = function() {
    document.getElementById('gameOverModal').style.display = "none";
    startGame();
}

document.addEventListener('DOMContentLoaded', fetchQuotes);

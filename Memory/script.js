const symbols = ['🍎', '🍌', '🍇', '🍒', '🍍', '🥝', '🍉', '🍋'];
const gameBoard = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;

const shuffledSymbols = [...symbols, ...symbols].sort(() => 0.5 - Math.random());

// Math.random() gibt eine Zufallszahl zwischen 0 und 1 zurück.
// 0.5 - Math.random() ergibt eine Zufallszahl zwischen -0.5 und +0.5.
// .sort() benutzt diese Werte, um zwei Elemente im Array zufällig miteinander zu vertauschen.

shuffledSymbols.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol; // data-symbol="symbol"
    card.dataset.index = index;

    const inner = document.createElement('div');
    inner.classList.add('card-inner');

    const front = document.createElement('div');
    front.classList.add('card-front');
    front.textContent = symbol;

    const back = document.createElement('div');
    back.classList.add('card-back');
    back.textContent = '?';

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});

function flipCard() {
    if (lockBoard || 
        this.classList.contains('flipped') || 
        this.classList.contains('matched')) {
        return;
    };

    this.classList.add('flipped');

    if (!firstCard) {
    firstCard = this;
    } else {
    secondCard = this;
    lockBoard = true;
    checkForMatch();
    }
}

function checkForMatch() {
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

    if (isMatch) {
    setTimeout(() => {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        score++;
        updateScore();
        resetBoard();
    }, 500);
    } else {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
    }
}

function updateScore() {
    scoreDisplay.textContent = `Punkte: ${score}`;
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function switchColor() {
    const body = document.body
    const button = document.getElementById("switch");

    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        button.textContent = "Dark Mode";

    } else {
        body.classList.toggle("dark-mode");
        button.textContent = "Light Mode";
    }
}
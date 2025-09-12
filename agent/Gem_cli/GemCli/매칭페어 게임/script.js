const gameBoard = document.querySelector('.game-board');
const difficultySelect = document.getElementById('difficulty');
const emojiSetSelect = document.getElementById('emoji-set');
const startButton = document.getElementById('start-btn');
const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');

const emojiSets = {
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷️'],
    food:    ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🌽', '🥕', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🥞', '🥓'],
    sports:  ['⚽️', '🏀', '🏈', '⚾️', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🥅', '⛳️', '🪁', '🏹', '🎣', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️', '🥌', '🎿', '⛷️', '🏂', '🏋️‍♀️', '🤼‍♀️', '🤸‍♀️', '🤺', '🤾‍♀️']
};

let cards = [];
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let timer;
let timeLeft = 60;

function startGame() {
    // Clear previous game
    clearInterval(timer);
    gameBoard.innerHTML = '';
    flippedCards = [];
    matchedCards = [];
    moves = 0;
    movesDisplay.textContent = `Moves: ${moves}`;

    // Setup new game
    const difficulty = parseInt(difficultySelect.value);
    const emojiSet = emojiSetSelect.value;
    const totalCards = difficulty * difficulty;
    const cardCount = totalCards / 2;

    // Adjust grid style based on difficulty
    gameBoard.style.gridTemplateColumns = `repeat(${difficulty}, 80px)`;

    // Create card set
    const selectedEmojis = emojiSets[emojiSet].slice(0, cardCount);
    cards = [...selectedEmojis, ...selectedEmojis];
    shuffle(cards);

    // Create card elements
    cards.forEach(emoji => {
        const card = createCard(emoji);
        gameBoard.appendChild(card);
    });

    // Start timer
    timeLeft = 60; // Reset timer
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    if (timeLeft === 0) {
        clearInterval(timer);
        alert('Game Over! You ran out of time.');
        disableBoard();
    }
}

function disableBoard() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.removeEventListener('click', flipCard));
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(emoji) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">${emoji}</div>
        </div>
    `;

    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !matchedCards.includes(this)) {
        this.classList.add('flipped');
        flippedCards.push(this);
        
        if (flippedCards.length === 1) { // First card flipped
            moves++;
            movesDisplay.textContent = `Moves: ${moves}`;
        }

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const emoji1 = card1.dataset.emoji;
    const emoji2 = card2.dataset.emoji;

    if (emoji1 === emoji2) {
        matchedCards.push(card1, card2);
        if (matchedCards.length === cards.length) {
            clearInterval(timer);
            setTimeout(() => alert('Congratulations! You won!'), 300);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];
}

startButton.addEventListener('click', startGame);

// Initial game start
startGame();

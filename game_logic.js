let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const playerXNameInput = document.getElementById('playerXName');
const playerONameInput = document.getElementById('playerOName');
let playerXName = playerXNameInput.value;
let playerOName = playerONameInput.value;

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
    restartBtn.addEventListener('click', restart);
};

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
            let winningBlocks = playerHasWon();
            let winningPlayer = currentPlayer === X_TEXT ? playerXName : playerOName;

            playerText.innerHTML = `${winningPlayer} (${currentPlayer}) has won!`;

            winningBlocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
            return;
        }

        if (spaces.every(cell => cell !== null)) {
            playerText.innerHTML = "Even-stevens, play again!";
            return;
        }

        currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
    }
}


const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] && (spaces[a] === spaces[b] && spaces[a] === spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

function restart() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    playerXNameInput.value = ''; // Clear input field
    playerONameInput.value = ''; // Clear input field

    playerXName = "Player X";
    playerOName = "Player O";

    playerText.innerHTML = `${playerXName} vs ${playerOName}`;

    currentPlayer = X_TEXT;
}

startGame();


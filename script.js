let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let turnDisplay = document.querySelector('.turn');
let score1Display = document.querySelector('.score1');
let score2Display = document.querySelector('.score2');
let newGameBtn = document.querySelector('#newgame');
let closePopupBtn = document.querySelector('#closePopup');

let turn0 = true;
let scoreO = 0;
let scoreX = 0;
let moveCount = 0;

newGameBtn.style.display = "none";

const winpatterns = [
    [0,1,2],[0,3,6],[0,4,8],
    [1,4,7],[2,5,8],[2,4,6],
    [3,4,5],[6,7,8]
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {

        if (box.innerText !== "") return;

        if (turn0) {
            box.innerText = "O";
            turnDisplay.innerText = "Player 2's turn";
        } else {
            box.innerText = "X";
            turnDisplay.innerText = "Player 1's turn";
        }

        turn0 = !turn0;
        box.disabled = true;
        moveCount++;

        checkWinner();
    });
});

const showPopup = (text) => {
    msg.innerText = text;
    msgContainer.classList.add("show");
};

const updateScore = (winner) => {
    if (winner === "O") {
        scoreO++;
    } else {
        scoreX++;
    }

    renderScore();

    if (scoreO === 5 || scoreX === 5) {
        showPopup((scoreO === 5 ? "Player 1" : "Player 2") + " Wins the Match!");
        newGameBtn.style.display = "inline-block"; // show only now
        disableBoxes();
        return;
    }
};

const renderScore = () => {
    score1Display.innerText = "Player 1: " + scoreO;
    score2Display.innerText = "Player 2: " + scoreX;
};

const checkWinner = () => {
    for (let pattern of winpatterns) {
        let [a,b,c] = pattern;

        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[b].innerText === boxes[c].innerText
        ) {
            let winner = boxes[a].innerText;

            showPopup((winner === "O" ? "Player 1" : "Player 2") + " wins!");
            updateScore(winner);
            disableBoxes();
            return;
        }
    }

    if (moveCount === 9) {
        showPopup("It's a Draw!");
        disableBoxes();
    }
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });

    moveCount = 0;
    turn0 = true;
    turnDisplay.innerText = "Player 1's turn";
};

closePopupBtn.addEventListener('click', () => {
    msgContainer.classList.remove("show");

    if (scoreO < 5 && scoreX < 5) {
        enableBoxes();
    }
});

resetBtn.addEventListener('click', () => {
    enableBoxes();
});

newGameBtn.addEventListener('click', () => {
    scoreO = 0;
    scoreX = 0;
    renderScore();

    enableBoxes();
    msgContainer.classList.remove("show");

    newGameBtn.style.display = "none";  
});
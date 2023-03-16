// const words = ["javascript", "python", "ruby", "java", "cplusplus"];
// let selectedWord = "";
// let displayWord = "";
// let lives = 7;

const wordEl = document.getElementById("word");
const messageEl = document.getElementById("message");
const keyboardEl = document.getElementById("keyboard");
const resetBtn = document.getElementById("reset");

resetBtn.addEventListener("click", resetGame);


// async function randomWord() {
//     const difficulty = document.getElementById("difficulty").value;
//     const response = await fetch(`https://random-word-api.herokuapp.com/word?number=1&length=${getLengthByDifficulty(difficulty)}`);
//     const data = await response.json();
//     return data[0];
// }

// function getLengthByDifficulty(difficulty) {
//     switch (difficulty) {
//         case "easy":
//             return "4,6";
//         case "medium":
//             return "7,9";
//         case "hard":
//             return "10,20";
//         default:
//             return "4,6";
//     }
// }


async function randomWord() {
    // I have changed the API to return only words with 5 letters.
    // Have been trying it and if not is too difficult.
    const response = await fetch("https://random-word-api.herokuapp.com/word?length=5");
    const data = await response.json();
    // I use toUpperCase() so the word is always in uppercase. I also use the button letters in uppercase.
    return data[0].toUpperCase();
}

function displayKeyboard() {
    for (let i = 65; i <= 90; i++) {
        const btn = document.createElement("button");
        btn.classList.add("btn", "btn-secondary");
        btn.textContent = String.fromCharCode(i);
        btn.addEventListener("click", handleKeyPress);
        keyboardEl.appendChild(btn);
    }
}

function displayMaskedWord() {
    // I use replace() to replace all the letters with "_"
    displayWord = selectedWord.replace(/./g, "_");
    wordEl.textContent = displayWord;
}

function handleKeyPress(e) {
    const letter = e.target.textContent;
    e.target.disabled = true;

    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] == letter) {
                displayWord = displayWord.substring(0, i) + letter + displayWord.substring(i + 1);
            }
            e.target.classList = "btn btn-success";
        }
        wordEl.textContent = displayWord;

        if (displayWord === selectedWord) {
            messageEl.textContent = "You won!";
            disableKeyboard();
        }
    } else {
        lives--;
        updateHangmanImage();
        e.target.classList = "btn btn-danger";

        if (lives === 0) {
            messageEl.textContent = "You lost! The word was: " + selectedWord;
            disableKeyboard();
        } else {
            messageEl.textContent = "Wrong! Lives remaining: " + lives;
        }
    }
}

function disableKeyboard() {
    const buttons = document.querySelectorAll("#keyboard button");
    buttons.forEach((btn) => {
        btn.disabled = true;
    });
}

async function resetGame() {
    selectedWord = await randomWord();
    displayMaskedWord();
    messageEl.textContent = "";
    lives = 7;

    const buttons = document.querySelectorAll("#keyboard button");
    buttons.forEach((btn) => {
        btn.disabled = false;
        btn.classList = "btn btn-secondary";
    });

    updateHangmanImage();
}

function updateHangmanImage() {
    const hangmanImg = document.getElementById("hangman");
    const wrongGuesses = 7 - lives;
    hangmanImg.src = `images/${wrongGuesses}.png`;
}

displayKeyboard();
resetGame();

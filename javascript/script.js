// Federico Barca
// MCSBT

// Description: This is the JavaScript file for the Hangman game.

// Global variables
const wordEl = document.getElementById("word");
const messageEl = document.getElementById("message");
const keyboardEl = document.getElementById("keyboard");
const resetBtn = document.getElementById("reset");
const difficultyEl = document.getElementById("difficulty");

// Event listeners for the reset button and the difficulty select.
resetBtn.addEventListener("click", resetGame);
difficultyEl.addEventListener("change", resetGame);


// Function to get the length of the word based on the difficulty.
function getLengthByDifficulty(difficulty) {
    switch (difficulty) {
        case "easy":
            return "4";
        case "medium":
            return "6";
        case "hard":
            return "8";
        case "extreme":
            return "10";
        case "impossible":
            return "12";
    }
}

// Function to get a random word from the API.
async function randomWord() {
    const difficulty = document.getElementById("difficulty").value;
    const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${getLengthByDifficulty(difficulty)}&lang=en`);
    const data = await response.json();
    return data[0].toUpperCase();
}

// Function to display the keyboard.
function displayKeyboard() {
    // Use a for loop to create the buttons for the keyboard.
    // Use the ASCII code to get the letters. 65 is the code for "A" and 90 is the code for "Z".
    for (let i = 65; i <= 90; i++) {
        // Create the button element.
        const btn = document.createElement("button");
        btn.classList.add("btn", "btn-secondary");
        btn.textContent = String.fromCharCode(i);
        btn.addEventListener("click", handleKeyPress);
        // Append the created button to the keyboard div.
        keyboardEl.appendChild(btn);
    }
}

// Function to display the masked word.
function displayMaskedWord() {
    // replace() to replace all the letters with "_"
    displayWord = selectedWord.replace(/./g, "_");
    wordEl.textContent = displayWord;
}

// Function to handle the key press.
function handleKeyPress(e) {
    const letter = e.target.textContent;
    e.target.disabled = true;

    // Check if the selected word includes the letter.
    if (selectedWord.includes(letter)) {
        // Use a for loop to check the places the letter is in the word.
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] == letter) {
                displayWord = displayWord.substring(0, i) + letter + displayWord.substring(i + 1);
            }
            // Change the class of the button to btn-success.
            e.target.classList = "btn btn-success";
        }
        // Update the word element. Show the letter.
        wordEl.textContent = displayWord;

        // Check if the word is complete and if it is the player wins.
        if (displayWord === selectedWord) {
            messageEl.textContent = "You won!";
            disableKeyboard();
        }
    // If the word doesn't include the letter, the player loses a life.
    } else {
        lives--;
        updateHangmanImage();
        e.target.classList = "btn btn-danger";
        // Check if the player has any lives left. If not, the player loses.
        if (lives === 0) {
            messageEl.textContent = "You lost! The word was: " + selectedWord;
            disableKeyboard();
        } else {
            messageEl.textContent = "Wrong! Lives remaining: " + lives;
        }
    }
}

// Function to disable the keyboard when the game is over.
function disableKeyboard() {
    const buttons = document.querySelectorAll("#keyboard button");
    buttons.forEach((btn) => {
        btn.disabled = true;
    });
}

// Function to reset the game and get a new word.
async function resetGame() {
    selectedWord = await randomWord();
    displayMaskedWord();
    messageEl.textContent = "";
    lives = 7;

    const buttons = document.querySelectorAll("#keyboard button");
    // When I reset the game, I enable all the buttons and change the class to btn-secondary.
    buttons.forEach((btn) => {
        btn.disabled = false;
        btn.classList = "btn btn-secondary";
    });

    updateHangmanImage();
}

// Function to update the hangman image.
function updateHangmanImage() {
    const hangmanImg = document.getElementById("hangman");
    const wrongGuesses = 7 - lives;
    hangmanImg.src = `images/${wrongGuesses}.png`;
}

// Call the functions to run the game.
displayKeyboard();
resetGame();

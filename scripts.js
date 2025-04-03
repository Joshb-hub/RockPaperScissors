let userScore = 0;
let compScore = 0;
let totalRounds = 1; // Default to 1 round
let currentRound = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const roundsInput = document.querySelector("#rounds-input"); // Getting user input field

// Function to generate computer's choice
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

// Function to handle a draw
const drawGame = () => {
  msg.innerText = "Game was a Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

// Function to show the winner and update scores
const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }

  // Increase round count
  currentRound++;

  // Check if all rounds are completed
  if (currentRound >= totalRounds) {
    setTimeout(() => {
      alert(`Game Over! Final Score: You ${userScore} - ${compScore} Computer`);
      resetGame(); // Automatically reset after rounds complete
    }, 1000);
  }
};

// Function to play the game
const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

// Function to reset the game
const resetGame = () => {
  userScore = 0;
  compScore = 0;
  currentRound = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
};

// Function to start a new game with user-defined rounds
const startNewGame = () => {
  const rounds = parseInt(roundsInput.value); // Get input value
  if (isNaN(rounds) || rounds < 1) {
    alert("Please enter a valid number of rounds (1 or more).");
    return;
  }
  
  totalRounds = rounds;
  resetGame(); // Reset the game before starting new rounds
  alert(`New Game Started! You will play ${totalRounds} rounds.`);
};

// Event Listeners for choices
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (currentRound < totalRounds) {
      const userChoice = choice.getAttribute("id");
      playGame(userChoice);
    } else {
      alert("Game Over! Click 'New Game' to play again.");
    }
  });
});

// Event Listeners for buttons
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", startNewGame);

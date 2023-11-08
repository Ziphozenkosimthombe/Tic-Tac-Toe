//DOM element
// targeting each square by it's own id
const squareOne = document.getElementById("grid__square-1");
const squareTwo = document.getElementById("grid__square-2");
const squareThree = document.getElementById("grid__square-3");
const squareFour = document.getElementById("grid__square-4");
const squareFive = document.getElementById("grid__square-5");
const squareSix = document.getElementById("grid__square-6");
const squareSeven = document.getElementById("grid__square-7");
const squareEight = document.getElementById("grid__square-8");
const squareNine = document.getElementById("grid__square-9");
//targeting all square classes
const allSquares = document.querySelectorAll(".grid__square");

//targeting the each players score by it's id
const playerOneScore = document.getElementById("info__player__score1");
const playerTwoScore = document.getElementById("info__player__score2");

//targeting the instructions the infoText and the StartGame button
const infoText = document.getElementById("instructions__text");
const startGameBtn = document.getElementById("instructions__btn");


//model id
const modal = document.getElementById("modal");
/*--------------------VARIABLES----------------*/ 
//class for the playerOne and PlayerTwo they will have the defaul values
const players = {
    playerOne: { name: "Jack", wins: 0 },
    playerTwo: { name: "Jill", wins: 0 },
};
let move = 1
let nextPlayer = players.playerOne.name
let pastPlayer;
let currentImage = 'cross'
let playerHasWon = false

/*-----------------SQUARES CLICKING---------------------*/
//adding the eventListener for each square when you are clicking on it
function addSquareClick() {
    allSquares.forEach((square) => {
      square.addEventListener("click", squareClick);
    });
}

//function that going to remove the eventListener each time for each player or square
function removeSquareClick() {
    allSquares.forEach((square) => {
      square.removeEventListener("click", squareClick);
    });
}

//function that going to run each time you are clicking the square
function squareClick() {
    if (!this.classList.contains("cross") && !this.classList.contains("circle")) {
      this.classList.add(`${currentImage}`);
      incrementMove();
    }
}
/*-----------INCREMENT-----------*/
//increment the the moves each time we are playing

function incrementMove() {
    move += 1;
    if (move % 2 !== 0) {
      nextPlayer = players.playerOne.name;
      pastPlayer = players.playerTwo.name;
      currentImage = "cross";
      infoText.innerHTML = `${players.playerOne.name}'s turn`;
    } else {
      nextPlayer = players.playerTwo.name;
      pastPlayer = players.playerOne.name;
      currentImage = "circle";
      infoText.innerHTML = `${players.playerTwo.name}'s turn`;
    }
    checkForWin();
    checkForTie();
}


/*--------------CHECK FOR WIN---------------*/

function checkForWin() {
    const lines = [
      [squareOne, squareTwo, squareThree],
      [squareFour, squareFive, squareSix],
      [squareSeven, squareEight, squareNine],
      [squareOne, squareFour, squareSeven],
      [squareTwo, squareFive, squareEight],
      [squareThree, squareSix, squareNine],
      [squareOne, squareFive, squareNine],
      [squareThree, squareFive, squareSeven],
    ];
    for (const line of lines) {
      const hasCross = line.every((square) => square.classList.contains("cross"));
      const hasCircle = line.every((square) =>
        square.classList.contains("circle")
      );
      if (hasCross || hasCircle) {
        const winner = hasCross ? players.playerOne : players.playerTwo;
        winner.wins += 1;
        updateScores();
        playerWon();
        return;
      }
    }
}

/*-----------update the score------------*/
function updateScores() {
    playerOneScore.innerHTML = players.playerOne.wins;
    playerTwoScore.innerHTML = players.playerTwo.wins;
}  

/*-------check the which player won------------*/
function playerWon() {
    infoText.innerHTML = `${pastPlayer} won!`;
    playerHasWon = true;
    continueGame();
}

/* -------------------CHECK for the TIE----------------*/
function checkForTie() {
    const squares = [
      squareOne,
      squareTwo,
      squareThree,
      squareFour,
      squareFive,
      squareSix,
      squareSeven,
      squareEight,
      squareNine,
    ];
  
    const allSquaresFilled = squares.every((square) => {
      return (
        square.classList.contains("cross") || square.classList.contains("circle")
      );
    });
  
    if (allSquaresFilled && !playerHasWon) {
      infoText.innerHTML = "It's a tie!";
      continueGame();
    }
}

/*-------continue the game-----------*/
function continueGame() {
    removeSquareClick();
    setTimeout(() => {
      reset();
    }, 2000);
}

/*--------restart the game--------*/
function restartGame() {
    removeSquareClick();
    reset();
}

/*-------reset the game----------*/

function reset() {
    allSquares.forEach((square) => {
      square.classList = "grid__square";
    });
    addSquareClick();
    playerHasWon = false;
    infoText.innerHTML = `${nextPlayer}'s turn to start`;
}

/*------------start the game------------*/
function startGame() {
    startGameBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const player1Input = document
        .getElementById("player1")
        .value.trim()
        .toLowerCase();
      const player2Input = document
        .getElementById("player2")
        .value.trim()
        .toLowerCase();
  
      const player1InputCap =
        player1Input.charAt(0).toUpperCase() + player1Input.slice(1);
      const player2InputCap =
        player2Input.charAt(0).toUpperCase() + player2Input.slice(1);
  
      players.playerOne.name = player1InputCap;
      players.playerTwo.name = player2InputCap;
      nextPlayer = player1InputCap;
  
      document.getElementById("info__player__name1").innerHTML =
        players.playerOne.name;
      document.getElementById("info__player__name2").innerHTML =
        players.playerTwo.name;
  
      players.playerOne.wins = 0;
      players.playerTwo.wins = 0;
      updateScores();
  
      infoText.innerHTML = `${players.playerOne.name}'s turn to start`;
      modal.style.display = "none";
  
      startGameBtn.innerHTML = "Restart Game";
      addSquareClick();
      restartGame();
    });
}
startGame();
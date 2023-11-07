//DOM element
// targeting each square by it's own id
const squareOne = document.getElementById('grid__square-1')
const squareTwo = document.getElementById('grid__square-1')
const squareThree = document.getElementById('grid__square-1')
const squareFour = document.getElementById('grid__square-1')
const squareFive = document.getElementById('grid__square-1')
const squareSix = document.getElementById('grid__square-1')
const squareSeven = document.getElementById('grid__square-1')
const squareEight = document.getElementById('grid__square-1')
const squareNine = document.getElementById('grid__square-1')
//targeting all square classes
const allSquare = document.querySelectorAll('.grid__square')

//targeting the each players score by it's id
const playerOneScore = document.getElementById('info__player__score1')
const playerTwoScore = document.getElementById('info__player__score2')

//targeting the instructions the infoText and the StartGame button
const infoText = document.getElementById('instructions__text')
const startGameBtn = document.getElementById('instructions__btn')

//model id
const model = document.getElementById('model')

//class for the playerOne and PlayerTwo they will have the defaul values
class Player{
    constructor(name, wins){
        this.name = name
        this.wins = wins
    }
}
const players = {
    playerOne: new Player('jack', 0),
    playerTwo: new Player('jill', 0)
}

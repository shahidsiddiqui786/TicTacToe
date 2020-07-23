const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
let NAME1,NAME2
const WINNING_COMBINATION = 
    [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const toggles = document.getElementsByClassName('toggle')
const players = document.getElementsByClassName('playerName')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const player = document.getElementById('player')
const sound = document.getElementById('sound')
const turn = document.getElementById('turn')
const level = document.getElementById('level')
const turnGroup = document.getElementById('turnGroup')
const diffculty = document.getElementById('diffculty')
const gameSetup = document.getElementById('gameSetup')
const startButton = document.getElementById('startButton')
const playScreen = document.getElementById('playScreen')
const resetGame = document.getElementById('resetGame')
let circleTurn

[...toggles].forEach(toggle => {
    toggle.addEventListener('click',toggler)
})

startButton.addEventListener('click',setupBlock)

resetGame.addEventListener('click',restartGame)

function restartGame() {
    gameSetup.style.display = 'flex'
    playScreen.style.display = 'none'
}

function setupBlock() {
    gameSetup.style.display = 'none'
    playScreen.style.display = 'grid'
    if(player.classList.contains('cool')){
        let p1 = prompt('Enter user name','player1')
        if (p1 == null || p1 == "") NAME1 = 'player1'
        else NAME1 = p1
        let p2 = prompt('Enter user name','player2')
        if (p2 == null || p2 == "") NAME2 = 'player2'
        else NAME2 = p2
    }
    else{
        let p1 = prompt('Enter user name','player1')
        if (p1 == null || p1 == "") NAME1 = 'player1'
        else NAME1 = p1
    }
    setName()
}

function toggler(toggle) {
    const children = toggle.target.children
    if(children.length){
     children[0].classList.toggle('cool')
     playerTurn()
     soundChoice()
    }
}

function setName() {
    if(player.classList.contains('cool')){
       if(turnChoice()){
        players[0].textContent = NAME2
        players[1].textContent = NAME1
       }
       else{
        players[0].textContent = NAME1
        players[1].textContent = NAME2
       }
    }
    else{
        if(turnChoice()){
            players[1].textContent = NAME1
            players[0].textContent = 'Computer'
        }
        else{
            players[0].textContent = NAME1
            players[1].textContent = 'Computer'
        }
    }
    console.log(turnChoice())
}

function playerTurn() {
    if(player.classList.contains('cool')){
        turnGroup.children[0].textContent = 'Player1' 
        turnGroup.children[2].textContent = 'Player2'
        diffculty.style.display = 'none'
     }
     else{
        turnGroup.children[0].textContent = 'Player' 
        turnGroup.children[2].textContent = 'Computer'
        diffculty.style.display = 'grid'
     }
}

function soundChoice() {
      console.log('sound')
}

function turnChoice() {
    return turn.classList.contains('cool')
}

startGame()

restartButton.addEventListener('click',startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleclick)
        cell.addEventListener('click', handleclick, { once:true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleclick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
       endGame(false)  
    }
    else if(isDraw()){
       endGame(true)
    }
    else{
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw){
    if(draw){
       winningMessageTextElement.innerHTML = 'Draw'
    }
    else{
      winningMessageTextElement.innerHTML = `${circleTurn ? "o's" : "x's"} Wins `
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
     board.classList.remove(X_CLASS)
     board.classList.remove(CIRCLE_CLASS)
     if(circleTurn){
         board.classList.add(CIRCLE_CLASS)
     }
     else{
         board.classList.add(X_CLASS)
     }
}

function checkWin(currentClass) {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
'use strict'

const MINE = '🕷'
const FLAG = '❗'

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gBoard

var gCell = {
    minesAroundCount: 4,
    isShown: false,
    isMine: false,
    isMarked: true
}

var gLevel = {
    SIZE: 4,
    MINES: 2
}



function onInIt() {
    gGame.isOn = true
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    gBoard = buildBoard()
    renderBoard(gBoard)
    setMinesNegsCount(gBoard)
    boardCheck(gBoard)

}
function boardCheck(board) {
    var setMinesNegsCounts = []

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {

            setMinesNegsCounts.push(setMinesNegsCount(gBoard, i, j))

        }
    }

    return setMinesNegsCounts

}

function buildBoard() {
    const size = 4
    const board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = gCell.minesAroundCount
        }
    }

    board[1][2] = MINE
    board[3][1] = MINE

    return board
}



function setMinesNegsCount(board, rowIdx, colIdx) {
    var minesAroundCount = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue

            if (j < 0 || j >= board.length) continue

            if (board[i][j] === MINE) minesAroundCount++

        }

    }

    return minesAroundCount

}



function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board-container tbody')
    elBoard.innerHTML = strHTML
}


'use strict';

const board = document.querySelector('.gameboard__cells')
const cells = document.querySelectorAll('.gameboard__cell');

const gameBoard = (() => {
    const game = ['', '', '', '', '', '', '', '', ''];
    let turn = 1;

    const conditions = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 1, 2],
        [3, 4, 5],
        [6, 7 ,8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    
    const round = (e, mark) => {
        const target = e.target;
        const order = +target.dataset.order;
        target.innerHTML = mark;
        game[order - 1] = mark;
        conditions.forEach(checkWinner);
    }

    function checkWinner (cells) {
        if (game[cells[0]] === 'x' && game[cells[1]] === 'x' && game[cells[2]] === 'x') {
            console.log("Player one wins!");
            gameOver();
        } else if (game[cells[0]] === 'o' && game[cells[1]] === 'o' && game[cells[2]] === 'o') {
            console.log("Player two wins!");
            gameOver();
        }
    }
    
    function gameOver() {
        cells.forEach(cell => {
            cell.removeEventListener('click', markField)
        })
    }

    return {
        round,
        turn
    }
})();

const Player = (mark) => {
    const move = (e) => {
        gameBoard.round(e, mark);
    }
    return {move}
}

const playerOne = Player('x');
const playerTwo = Player('o');

function markField (e) {
    if (e.target.innerHTML !== '') return
    if (gameBoard.turn % 2 !== 0) {
        playerOne.move(e);
        gameBoard.turn++;
    } else {
        playerTwo.move(e);
        gameBoard.turn++
    }   
}

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', markField)
}
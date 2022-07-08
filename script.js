'use strict';

const board = document.querySelector('.gameboard__cells');
const cells = document.querySelectorAll('.gameboard__cell');
const status = document.querySelector('.status__message');
const reset = document.querySelector('.reset-btn');

const gameBoard = (() => {
    let game = ['', '', '', '', '', '', '', '', ''];
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
        target.textContent = mark;
        game[order - 1] = mark;
        for (let condition of conditions) {
            checkWinner(condition);
        }
    }

    function checkWinner (cells) {
        if (game[cells[0]] === 'x' && game[cells[1]] === 'x' && game[cells[2]] === 'x') {
            status.textContent = "Player X wins!";
            gameOver();
        } else if (game[cells[0]] === 'o' && game[cells[1]] === 'o' && game[cells[2]] === 'o') {
            status.textContent = "Player O wins!";
            gameOver();
        } else if (game.every(item => item !== '')) status.textContent = "It's a tie!";
    }
    
    function gameOver() {
        board.removeEventListener('click', playGame);
    }

    function resetField() {
        game = game.map(item => item = '');
        cells.forEach(cell => cell.textContent = '');
        status.textContent = 'Player X';
        turn = 1;
    }

    function changeTurn() {
        turn += 1;
    }

    function playGame (e) {
        if (e.target.innerHTML !== '') return
        if (turn % 2 !== 0) {
            playerTwo.showTurn();
            playerOne.move(e);
        } else {
            playerOne.showTurn();
            playerTwo.move(e);
        }   
    }

    return {
        round,
        changeTurn,
        resetField,
        turn,
        playGame
    }
})();

const Player = (name, mark) => {
    const showTurn = () => {
        status.textContent = name;
    };
    const move = (e) => {
        gameBoard.round(e, mark);
        gameBoard.changeTurn();
    }
    return {showTurn, move}
}

const playerOne = Player('Player X', 'x');
const playerTwo = Player('Player O', 'o');

board.addEventListener('click', gameBoard.playGame)

reset.addEventListener('click', () => {
    gameBoard.resetField();
    board.addEventListener('click', gameBoard.playGame);
});
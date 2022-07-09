'use strict';
const Player = (name, mark) => {
    const move = (e) => {
        gameController.round(e, mark);
        gameController.changeTurn();
    }
    return {name, move}
}

const gameController = (() => {
    let game = ['', '', '', '', '', '', '', '', ''];
    this.turn = 1;

    const playerOne = Player('Player X', 'x');
    const playerTwo = Player('Player O', 'o');


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
            gameBoard.status.textContent = "Player X wins!";
            gameOver();
        } else if (game[cells[0]] === 'o' && game[cells[1]] === 'o' && game[cells[2]] === 'o') {
            gameBoard.status.textContent = "Player O wins!";
            gameOver();
        } else if (game.every(item => item !== '')) gameBoard.status.textContent = "It's a tie!";
    }
    
    function gameOver() {
        gameBoard.board.removeEventListener('click', playGame);
    }

    function changeTurn() {
        turn += 1;
    }

    function showTurn(name) {
        gameBoard.status.textContent = name;
    };

    function resetField () {
        game = game.map(item => item = '');
        gameBoard.cells.forEach(cell => cell.textContent = '');
        gameBoard.status.textContent = "Let's start!";
        turn = 1
    }

    function playGame (e) {
        if (e.target.innerHTML !== '') return
        if (turn % 2 !== 0) {
            showTurn(playerTwo.name);
            playerOne.move(e);
        } else {
            showTurn(playerOne.name);
            playerTwo.move(e);
        }   
    }

    return {
        game,
        round,
        changeTurn,
        playGame,
        showTurn,
        resetField,
        turn
    }
})();

const gameBoard =(() => {
    const board = document.querySelector('.gameboard__cells');
    const cells = document.querySelectorAll('.gameboard__cell');
    const reset = document.querySelector('.reset-btn');
    const status = document.querySelector('.status__message');

    board.addEventListener('click', gameController.playGame)

    reset.addEventListener('click', () => {
        gameController.resetField();
        board.addEventListener('click', gameController.playGame);
    });

    return {board, cells, status}
})();

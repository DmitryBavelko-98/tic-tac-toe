'use strict';

const board = document.querySelector('.gameboard__cells')
const cells = document.querySelectorAll('.gameboard__cell');

const gameBoard = (() => {
    const game = [];
    let turn = 1;
    
    const round = (e, mark) => {
        const target = e.target;
        target.innerHTML = mark;
        game.push(target.innerHTML);
    }

    return {
        round,
        game
    }
})();

const Player = (mark) => {
    const move = (e) => {
        if (e.target.innerHTML !== '') return;
        gameBoard.round(e, mark);
    }
    return {move}
}

const playerOne = Player('x');
const playerTwo = Player('o');

function declareWinner () {
    
}

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', (e) => {
        if (gameBoard.game.length % 2 === 0) {
            playerOne.move(e);
        } else {
            playerTwo.move(e);
        }   
    })  
}
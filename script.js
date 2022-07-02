'use strict';

const cells = document.querySelectorAll('.gameboard__cell');

const gameBoard = (() => {
    const game = [];
    let turn = 1;
    
    const round = (e, mark) => {
        e.target.innerHTML = mark;
        turn++;
    }

    return {
        round,
        turn
    }
})();

const Player = (mark) => {
    const move = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                console.log(gameBoard.turn);
                gameBoard.round(e, mark);
            })
        })
    }   
    return {move}
}

const playerOne = Player('x');
const playerTwo = Player('o');


if (gameBoard.turn % 2 !== 0) {
    playerOne.move();
} else playerTwo.move();




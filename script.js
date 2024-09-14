function Player(name, marker, newName) {
    this.name = name,
        this.marker = marker,

        this.setName = function () {
            this.name = newName
        }
}

const gameBoard = (function () {
    const board = []
    var player1 = new Player('Zidan', 'x');
    var player2 = new Player('Andri', 'o');
    var currPlayer = player1;

    for (let i = 0; i < 3; i++) {
        board.push(new Array(3))
    }

    var switchPlayer = () => {
        currPlayer === player1 ? currPlayer = player2 : currPlayer = player1;
        console.log(currPlayer)
    }

    var getPlayer = function (player) {
        return player === 'player1' ? player1 : player2
    }

    var getBoard = () => board;
    var setBoard = (row, column) => {
        if (board[row][column]) {
            alert('Choose the empty cell!');
        } else {
            board[row][column] = currPlayer.marker;
            switchPlayer();
        }
    };

    var resetBoard = function () {
        for(let i = 0; i < 3; i++) {

        }
    }

    return {
        getBoard,
        setBoard,
        switchPlayer,
        getPlayer,
        resetBoard
    }
})();

function checkTie() {
    [row1, row2, row3] = gameBoard.getBoard();
    if (!row1.includes(undefined) || !row2.includes(undefined) || !row3.includes(undefined)) {
        console.log('Its a tie!!!')
    }
}

function gameOverAndRestart() {

}

function playRound(row, column) {
    gameBoard.setBoard(row, column)
    decideWinner(gameBoard.getPlayer('player1'));
    decideWinner(gameBoard.getPlayer('player2'));
    checkTie()
    console.log(gameBoard.getBoard());
}

function decideWinner(player) {
    const winCon = [
        ['00', '01', '02'], ['10', '11', '12'], ['20', '21', '22'], // row
        ['00', '10', '20'], ['01', '11', '21'], ['02', '12', '22'], // column
        ['00', '11', '22'], ['02', '11', '20']                      // diagonal
    ]

    const board = gameBoard.getBoard()
    winCon.forEach(item => {
        [zero, one, two] = item;
        if (board[zero[0]][zero[1]] === player.marker
            && board[one[0]][one[1]] === player.marker
            && board[two[0]][two[1]] === player.marker) {
            alert(`${player.name} win!!!`);
        }
    })
}

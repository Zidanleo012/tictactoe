function Player(name, marker) {
    this.name = name,
        this.marker = marker
}

const gameBoard = (function () {
    const board = []
    var player1 = new Player('Zidan', 'x');
    var player2 = new Player('Andri', 'o');
    var currPlayer = player1;

    for (let i = 0; i < 3; i++) {
        board.push(new Array(3))
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

    var switchPlayer = () => {
        currPlayer === player1 ? currPlayer = player2 : currPlayer = player1;
        console.log(currPlayer)
    }

    return {
        getBoard,
        setBoard
    }
})();

function playRound(row, column) {
    gameBoard.setBoard(row, column)
    decideWinner()
    console.log(gameBoard.getBoard())
}

const winCon = ['012', '000', '111', '222'];

function decideWinner() {
    var board = gameBoard.getBoard()
    winCon.forEach(item => {
        [one, two, three] = item;
        while(i < 3) {
            if(board[i][0] === 'x' && board[i][1] === 'x' && board[i][2] === 'x') {

            }
            i++
        }
        // if(board[0][0] === 'x' && board[0][1] === 'x' && board[0][2] === 'x') {
        //     alert('winn!!!')
        // }
        console.log()
    })
}
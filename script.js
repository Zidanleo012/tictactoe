function Player(name, marker, newName) {
    this.name = name,
        this.marker = marker
}

const gameBoard = (function () {
    var player1 = new Player('Player 1', 'x');
    var player2 = new Player('Player 2', 'o');
    var currPlayer = player1;
    const board = [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
    ]

    var switchPlayer = (bool) => {
        if (bool) {
            currPlayer === player1 ? currPlayer = player2 : currPlayer = player1;
            displayController.statusDisplay('switch player', currPlayer.name);
        }
        console.log(currPlayer)
    }

    var getCurrPlayer = () => currPlayer;

    var getPlayer = function (player) {
        return player === 'player1' ? player1 : player2
    }

    var getBoard = () => board;
    var setBoard = (row, column) => {
        if (board[row][column]) {
            alert('Choose the empty cell!');
        } else {
            board[row][column] = currPlayer.marker;
            switchPlayer(true);
        }
    };

    var resetBoard = function () {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j] = undefined;
            }
        }

        currPlayer = player1
    }

    return {
        getBoard,
        setBoard,
        switchPlayer,
        getPlayer,
        resetBoard,
        getCurrPlayer
    }
})();

function checkTie() {
    [row1, row2, row3] = gameBoard.getBoard();
    if (!row1.includes(undefined) && !row2.includes(undefined) && !row3.includes(undefined)) {
        displayController.statusDisplay('tie')
    }
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
            displayController.statusDisplay('win', gameBoard.getCurrPlayer().name)
            gameBoard.resetBoard();
        }
    })
}

const displayController = (function () {
    var cells = document.querySelectorAll('.cell');
    var reset = document.querySelector('.reset');
    var status = document.querySelector('.status-display')
    var changeName = document.querySelector('.change-name')
    var initvalue = status.textContent

    var renderBoard = function () {
        cells.forEach((cell, index) => {
            cell.textContent = gameBoard.getBoard().flat()[index];
        })
    }
    renderBoard()

    var statusDisplay = function (condition, playerName) {
        if (condition === 'switch player') {
            status.textContent = `It's ${playerName}'s turn now`
        } else if (condition === 'reset') {
            status.textContent = initvalue
        } else if (condition === 'win') {
            status.textContent = `${playerName} WIN!!!`
        } else if (condition === 'tie') {
            status.textContent = 'It\'s a tie!'
        }
    }

    reset.addEventListener('click', (e) => {
        gameBoard.resetBoard();
        cells.forEach(cell => {
            cell.textContent = '';
        })
        statusDisplay('reset')
    })

    var addCellEvent = (function () {
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                [zero, one] = e.target.id
                playRound(zero, one)
            })
        })
    })();

    return {
        renderBoard,
        statusDisplay
    }
})();

function playRound(row, column) {
    gameBoard.setBoard(row, column)
    decideWinner(gameBoard.getPlayer('player1'));
    decideWinner(gameBoard.getPlayer('player2'));
    checkTie()
    displayController.renderBoard()
}
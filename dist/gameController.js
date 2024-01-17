const rollDiceButton = $()

class GameController {
    constructor(boardSize) {
        this.boardSize = boardSize;
        this.gameBoard = new Board(this.boardSize);
        this.initializeEventListener();
    }

    start() {
        this.gameBoard.initializeBoard();
        this.startGame();
    }

    startGame() {
        // this.startTurn();
    }
    
    startTurn() {
        const currentPlayer = this.gameBoard.getCurrentPlayer();

        console.log('startTurn called');
        if (currentPlayer instanceof Dumbot) {
            console.log('startDumbotTurn called');
        }

        this.gameBoard.displayPlayerTurn(currentPlayer);
        currentPlayer.rollValue = this.gameBoard.dice.rollDice();
        rollDice(currentPlayer.rollValue);
        diceSound.volume = 1.0;
        diceSound.play();
        console.log("diceRoll audio working");

        this.gameBoard.turnNumber++

        setTimeout(async () => {
            this.gameBoard.movePlayer(currentPlayer, currentPlayer.rollValue)
            this.gameBoard.displayPlayerTurn(currentPlayer)
            if (currentPlayer.position === this.gameBoard.totalCells) {
                setTimeout(() => {
                    alert(`Congratulations! ${currentPlayer.name} has won!`);
                    this.resetGame();
                }, 50);
                return;
            }

            this.changePlayerTurn();
            if(!(currentPlayer instanceof Dumbot)) {
                this.nextTurn();
            }
        }, 4000)
    }

    initializeEventListener() {
        $("body").on('click', '#roll-dice', () => {
            this.startTurn();
        });
    }

    nextTurn() {
        this.startTurn();
    }
    
    changePlayerTurn() {
        this.gameBoard.currentPlayerIndex = (this.gameBoard.currentPlayerIndex + 1) % this.gameBoard.players.length;
    }

    resetGame() {
        this.gameBoard.players.forEach(player => {
            player.position = 1;
            player.rollValue = 0;
            this.gameBoard.displayPlayerTurn(player);
        })
        this.currentPlayerIndex = 0;
    }
}
    

const boardSize = 10;
const gameController = new GameController(boardSize);
gameController.start();
const rollDiceButton = $('#roll-dice')

class GameController {
    constructor(boardSize) {
        this.boardSize = boardSize;
        this.gameBoard = new Board(this.boardSize);
    }

    start() {
        this.gameBoard.initializeBoard();
        this.startGame();
    }

    startGame() {
        this.startTurn();
    }
    
    startTurn() {
        console.log('startTurn called');
        const currentPlayer = this.gameBoard.getCurrentPlayer()
        this.gameBoard.displayPlayerTurn(currentPlayer)
        currentPlayer.rollValue = 0
        
        if (currentPlayer instanceof Player && !(currentPlayer instanceof Dumbot)) {
            rollDiceButton.off('click').on('click', () => {
                
                currentPlayer.rollValue = this.gameBoard.dice.rollDice()
                rollDice(currentPlayer.rollValue)
                diceSound.volume = 1.0;
                diceSound.play();
                setTimeout(() => {
                    this.gameBoard.movePlayer(currentPlayer, currentPlayer.rollValue)
                    this.gameBoard.displayPlayerTurn(this.gameBoard.getCurrentPlayer())
                    this.nextTurn();
                }, 4000);
            });
        } else {
            this.startDumbotTurn()
        }
    }

    startDumbotTurn() {
        console.log('startDumbotTurn called');
        const currentPlayer = this.gameBoard.getCurrentPlayer();
        currentPlayer.rollValue = this.gameBoard.dice.rollDice()
        rollDice(currentPlayer.rollValue)

        
        diceSound.volume = 1.0;
        diceSound.play();
        console.log("diceRoll audio working");
        
          
        setTimeout(() => {
            this.gameBoard.movePlayer(currentPlayer, currentPlayer.rollValue)
            this.gameBoard.displayPlayerTurn(currentPlayer)
            this.nextTurn();
        }, 4000)
    }
        
    nextTurn() {
        this.gameBoard.currentPlayerIndex = (this.gameBoard.currentPlayerIndex + 1) % this.gameBoard.players.length;
        this.startTurn();
    }
    
}
    

const boardSize = 10;
const gameController = new GameController(boardSize);
gameController.start();
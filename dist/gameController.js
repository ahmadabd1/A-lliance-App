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
        horseSound.volume = 1.0;
        horseSound.play();
        if (currentPlayer instanceof Dumbot) {
            console.log('startDumbotTurn called');
            setTimeout(() => {
                spaceShipSound.volume = 1.0;
                spaceShipSound.play();
                console.log("spaceShipSound audio working");
            }, 4000);
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
            logToGame('Dice Roll:' + '' + currentPlayer.rollValue);
            const sum = currentPlayer.position + currentPlayer.rollValue
            if ($(`#b${sum}`).attr('class') === 'black-hole-img') {
                console.log('WORKING')
                logToGame('You have been either decimated by a black hole or teleported by a worm hole, good luck');
            }
            if ($(`#q${sum}`).attr('class') === 'question-icon') {
                logToGame('You stand before fate incarnate, Choose your answer carefully, or be forever doomed');
            }
            console.log("result :", $(`#q${sum}`).attr('class'))
            console.log('sum:', sum)
            if (currentPlayer.position === this.gameBoard.totalCells) {
                setTimeout(() => {
                    alert(`Congratulations! ${currentPlayer.name} has won!`);
                    logToGame('Congratulations!, You have freed your galaxy');
                    this.resetGame();
                }, 50);
                return;
            }

            this.changePlayerTurn();
            if(!(currentPlayer instanceof Dumbot)) {
                logToGame('Dice Roll:' + '' + currentPlayer.rollValue);
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
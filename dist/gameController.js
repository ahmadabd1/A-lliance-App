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

        if (currentPlayer instanceof Dumbot) {
            setTimeout(() => {
                spaceShipSound.volume = 1.0;
                spaceShipSound.play();
            }, 4000);
        }

        this.gameBoard.displayPlayerTurn(currentPlayer);
        currentPlayer.rollValue = this.gameBoard.dice.rollDice();
        rollDice(currentPlayer.rollValue);
        diceSound.volume = 1.0;
        diceSound.play();

        this.gameBoard.turnNumber++

        setTimeout(async () => {
            const sum = currentPlayer.position + currentPlayer.rollValue
            this.gameBoard.movePlayer(currentPlayer, currentPlayer.rollValue)
            this.gameBoard.displayPlayerTurn(currentPlayer)
            if((currentPlayer instanceof Dumbot)){
                logToGame(`${currentPlayer.name}'s Dice Roll:` + '' + currentPlayer.rollValue , "red");
            }else{
                logToGame(`${currentPlayer.name}'s Dice Roll:` + '' + currentPlayer.rollValue , "blue");
            }
            if ($(`#b${sum}`).attr('class') === 'black-hole-img') {
                logToGame(`You have been either decimated by a black hole or teleported by a worm hole in cell ${sum} , good luck`);
            }
            if ($(`#q${sum}`).attr('class') === 'question-icon') {
                logToGame('You stand before fate incarnate, Choose your answer carefully, or be forever doomed');
            }
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
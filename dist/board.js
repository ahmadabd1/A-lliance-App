
class board{
    constructor(boardSize) {
        this.players = [];
        this.currentPlayerIndex = 0;
       // this.apiManager = new ApiManager();
       // this.questionHandler = new QuestionHandler(this.apiManager, this);
        this.dice = new Dice();
        this.dumbot = new Dumbot("DumBot");
        this.player = new Player("Naarani");
        this.boardSize = boardSize;
        this.totalCells = boardSize * boardSize;
        this.questionsInCells = {};
        this.maxQuestions = 10;
    }


    createBoard() {
        let indexArr = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1];
        var cardArr = [];
        let count = 1;

        indexArr.forEach((element) => {
            var rowArr = [];
            for (let index = 10; index >= 1; index--) {
                rowArr.push(count);
                count++;
            }
            cardArr = cardArr.concat(element ? rowArr : rowArr.reverse());
        });

        setTimeout(() => {
            cardArr.reverse().forEach((element, index) => {
                $(
                    "<div class='square' id='square" +
                    element.toString() +
                    "'><div>" +
                    element +
                    "<div/><div/>"
                ).appendTo(".cardBoard .boxes");

                $("#square" + element.toString()).css("animation", ".3s boxAnimation");
                $("#square" + element.toString()).css(
                    "animation-delay",
                    Math.floor(Math.random() * 100) / 40 + "s"
                );
                $("#square" + element.toString()).css("animation-fill-mode", "forwards");
            });
            this.players.forEach(player =>  this.updatePlayerPosition(player))
        }, 1200);
    }

    
    addPlayer(player) {
        this.players.push(player);
    }
    
    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }
    
    displayPlayerTurn(player) {
        const turnInfo = `Turn ${this.currentPlayerIndex + 1}: It's ${player.name}'s turn.`;
        
        $('#turn-info').empty().append(`<div>${turnInfo}</div>`);
        
        
        if (player instanceof Dumbot) {
            this.updateDumbotPosition(player);
        }
        else if (player instanceof Player) {
            this.updatePlayerPosition(player);
        }
        
    }
    
    updatePlayerPosition(player) {
        const cell = $(`#square${player.position}`);
        $(".player").remove();
        const newPlayerElement = $('<div class="player"></div>');
        cell.append(newPlayerElement);
        
        newPlayerElement.css({
            top: '50%',
            left: '50%',
        });
    }

    updateDumbotPosition(player) {
        const currentDumbotCell = $(`#square${player.position}`);
        $(".dumbot").remove();
        const dumbotElement = $('<div class="dumbot"></div>');
        currentDumbotCell.append(dumbotElement);

        dumbotElement.css({
            top: '50%',
            left: '50%',
        });
    }

    placeQuestionsRandomly() {
        for (let i = 0; i < this.maxQuestions; i++) {
            const randomCell = this.getRandomEmptyCell();
            if (randomCell) {
                this.questionsInCells[randomCell] = true;
            }
        }
    }

    getRandomEmptyCell() {
        const emptyCells = Array.from({ length: this.totalCells }, (_, i) => i + 1)
            .filter(cell => !this.questionsInCells[cell]);

        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            return emptyCells[randomIndex];
        }

        return null;
    }
    
    async initializeBoard() {
        this.createBoard();
        this.addPlayer(new Player("Player 1"));
        this.addPlayer(new Dumbot("Dumbot"));
        this.displayPlayerTurn(this.getCurrentPlayer());
        this.placeQuestionsRandomly();
    }
    
    
}





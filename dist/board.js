
class Board{
    constructor(boardSize) {
        this.players = [];
        this.currentPlayerIndex = 0;
       // this.apiManager = new ApiManager();
        this.questionHandler = new QuestionHandler(this);
        this.dice = new Dice();
        this.dumbot = new Dumbot("DumBot");
        this.player = new Player("Naarani");
        this.boardSize = boardSize;
        this.totalCells = boardSize * boardSize;
        this.questionsInCells = {};
        this.maxQuestions = 20;
        // this.gameController = new GameController(this.boardSize)
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
                    "'><div id='q" +
                    element +
                    "'>"+element+"<div/><div/>"
                ).appendTo(".cardBoard .boxes");

                $("#square" + element.toString()).css("animation", ".3s boxAnimation");
                $("#square" + element.toString()).css(
                    "animation-delay",
                    Math.floor(Math.random() * 100) / 40 + "s"
                );
                $("#square" + element.toString()).css("animation-fill-mode", "forwards");
            });
            this.players.forEach(player =>  {
                if(player instanceof Dumbot){
                    this.updateDumbotPosition(player)
                } 
                this.updatePlayerPosition(player);
            })
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
    }

    updateDumbotPosition(player) {
        const currentDumbotCell = $(`#square${player.position}`);
        //console.log(currentDumbotCell)
        $(".dumbot").remove();
        const dumbotElement = $('<div class="dumbot"></div>');
        //console.log(currentDumbotCell)
        currentDumbotCell.append(dumbotElement);
    }

    colorQuestionCell(cell) {
        const currentCell = $(`.q${cell}`);
        $(".q"+cell).css({
            'opacity': '1',
            'width': '50px',
            'height': '50px',
            'background-color': 'red'
        });

    }

    placeQuestionsRandomly() {
        for (let i = 0; i < this.maxQuestions; i++) {
            const randomCell = this.getRandomEmptyCell();
            console.log(randomCell)
            $('#q8').css("background-color" , "red")
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
        this.addPlayer(new Player("Player 1"));
        this.addPlayer(new Dumbot("Dumbot"));
        this.createBoard();
        this.displayPlayerTurn(this.getCurrentPlayer());
        this.placeQuestionsRandomly();
        // this.gameController(new GameController(this.boardSize))

    }
    
    checkQuestionAndDisplay(player) {
        const currentCell = player.position;
        if (this.questionsInCells[currentCell]) {
            this.questionHandler.fetchQuestion();
        }
    }
    
    
    movePlayer(player, steps) {
        const currentPosition = player.position;
        player.position += steps;
        
        const snakesMap = {
            16: 8,
            37: 26,
            56: 36,
            74: 60,
            87: 24,
            95: 75,
            99: 6
        };
        const laddersMap = {
            2: 23,
            10: 29,
            15: 34,
            44: 58,
            51: 73,
            78: 84,
            76: 93
        };

        if (snakesMap[player.position]) {
            player.position = snakesMap[player.position];
        }
        if (laddersMap[player.position]) {
            player.position = laddersMap[player.position];
        }
        
        // player.position = Math.max(0, this.totalCells);
        player.position = Math.min(player.position, this.totalCells);

        if (player instanceof Dumbot)
            this.updateDumbotPosition(player);
        else
            this.updatePlayerPosition(player);

        if (player.position < 1) {
            player.position = 1;
        }
        
        if (player instanceof Player && !(player instanceof Dumbot)) {
            this.checkQuestionAndDisplay(player);
        }
        
        let movement = player.position - currentPosition;

        if (snakesMap[player.position]) {
            movement = snakesMap[player.position] - currentPosition;
        }
        return movement;
    }
}





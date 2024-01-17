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

class Board {
    constructor(boardSize) {
        this.players = [];
        this.currentPlayerIndex = 0;
        this.questionHandler = new QuestionHandler(this);
        this.dice = new Dice();
        this.dumbot = new Dumbot("DumBot");
        this.player = new Player("Naarani");
        this.boardSize = boardSize;
        this.totalCells = boardSize * boardSize;
        this.questionsInCells = {};
        this.maxQuestions = 10
        this.turnNumber = 0
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
                const cellId = 'square' + element.toString();
                const cell = $("<div class='square' id='" + cellId + "'><div>" + element + "<div/><div/>");

                if (this.questionsInCells[element] && !this.isInMap(element, snakesMap) && !this.isInMap(element, laddersMap)) {
                    cell.append($('<div class="question-icon" ></div>'));
                }
                if (snakesMap[element]) {
                    cell.append($('<div class="black-hole-img"></div>'));
                }
    
                if (laddersMap[element]) {
                    cell.append($('<div class="black-hole-img"></div>'));
                }
                cell.appendTo(".cardBoard .boxes");

                $("#" + cellId).css("animation", ".3s boxAnimation");
                $("#" + cellId).css("animation-delay", Math.floor(Math.random() * 100) / 40 + "s");
                $("#" + cellId).css("animation-fill-mode", "forwards");
            });

            this.players.forEach(player => {
                if (player instanceof Dumbot) {
                    this.updateDumbotPosition(player)
                }
                this.updatePlayerPosition(player);
            });
        }, 1200);
    }

    isInMap(element, map) {
        return Object.keys(map).includes(element.toString()) || Object.values(map).includes(element);
    }

    addPlayer(player) {
        this.players.push(player);
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    displayPlayerTurn(player) {
        const turnInfo = `<div id="turn-number">Turn ${this.turnNumber}</div><br> <div id="turn-player">it's ${player.name}'s turn</div>`;
        console.log(this.turnNumber)

        $('#turn-info').empty().append(`<div>${turnInfo}</div>`);

        // let rollResult = '';
        // rollResult = `Player Dice Result: ${player.rollValue}`;

        // if (player instanceof Dumbot) {
        //     rollResult = `Dumbot Dice Result: ${player.rollValue}`;
        // }
        // $('#roll-result').empty().append(`<div>${rollResult}</div>`);


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
        $(".dumbot").remove();
        const dumbotElement = $('<div class="dumbot"></div>');
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
            const randomCellId = this.getRandomEmptyCell();
            console.log(randomCellId)
            const questionIcon = $('<div class="question-icon"></div>');

            if (randomCellId) {
                const cell = $(`#square${randomCellId}`);
                cell.append(questionIcon);
                this.questionsInCells[randomCellId] = true;
                this.questionsInCells[2] = true;
                this.questionsInCells[3] = true;
                this.questionsInCells[4] = true;
                this.questionsInCells[5] = true;
                this.questionsInCells[6] = true;
                this.questionsInCells[6] = true;
                this.questionsInCells[7] = true;
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
        this.placeQuestionsRandomly();
        this.displayPlayerTurn(this.getCurrentPlayer())
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
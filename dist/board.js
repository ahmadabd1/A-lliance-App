
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


}





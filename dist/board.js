
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


}


const t = new board(10)

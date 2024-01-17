class QuestionHandler {
    constructor(board) {
        // this.apiManager = apiManager;
        this.board = board;
        this.currentQuestion = null;
    }
    async fetchdata() {
        try {
            this.currentQuestion = await $.get("/data");
            console.log(this.currentQuestion)
            this.showQuestionPopup();
        } catch (error) {
            console.error("Error fetching question:", error);
        }
    }

    async fetchQuestion() {
        try {
            this.currentQuestion = await $.get("/data");
            console.log(this.currentQuestion)
            this.showQuestionPopup();
        } catch (error) {
            console.error("Error fetching question:", error);
        }
    }

    showQuestionPopup() {
        const questionText = this.currentQuestion[0].question;
        console.log(questionText)
        const answerOptions = [
            ...this.currentQuestion[0].incorrect_answers,
            this.currentQuestion[0].correct_answer,
        ];

        const userAnswer = prompt(`${questionText}\nOptions: ${answerOptions.join(', ')}`);

        const currentPlayer = this.board.getCurrentPlayer();

        let steps;

        if (userAnswer === this.currentQuestion.correct_answer) {
            alert("Woohoo! Correct answer! You can now proceed by 5 step.");
            steps = 5;
        } else {
            alert("Oops! Incorrect answer! You will now move back 10 steps.");
            steps = -10;
        }

        this.board.movePlayer(currentPlayer, steps);
    }
}

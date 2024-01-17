class QuestionHandler {
    constructor(board) {
        // this.apiManager = apiManager;
        this.board = board;
        this.currentQuestion = null;
        this.numsteps = 0
        this.player = board.getCurrentPlayer();
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
            this.modalPopUP();
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

        if (userAnswer == this.currentQuestion[0].correct_answer) {
            alert("Woohoo! Correct answer! You can now proceed by 5 step.");
            steps = 5;
        } else {
            alert("Oops! Incorrect answer! the correct answer is:-"+this.currentQuestion[0].correct_answer+" You will now move back 10 steps.");
            steps = -10;
        }

        this.board.movePlayer(currentPlayer, steps);
    }

    modalPopUP(){
        
            const currentPlayer = this.board.getCurrentPlayer();
            this.player = this.board.getCurrentPlayer();
            //Get modal
            var modal = $("#myModal");
            const questionText = this.currentQuestion[0].question;
            $("h2").text(questionText);
            const answerOptions = [
            ...this.currentQuestion[0].incorrect_answers,
            this.currentQuestion[0].correct_answer,
            ];
            const CorrectAnswer = answerOptions[3]

            for (let i=1;i<=answerOptions.length;i++){
                
                $(".answer"+i).text(answerOptions[i-1])
               
            }

            //get the <span> elemnt to closes the modal
            var span = $(".close");

            //when the user clicks on the button, open the model
            //replace this with your trigger event
            modal.show()

            //when the user clicks on <span> (x), closes the model
            span.on("click", function(event){
                    modal.hide();
                
            });
            //Handle form submission
            const questoionHandler = this;
            $("#optionsForm").on("submit", function(event){
                event.preventDefault();
                var selectedOptions = [];
                $('input[type=checkbox]:checked').each(function(){
                    selectedOptions.push($(this).next().text());
                });
                // Do something with the selected options
                console.log(selectedOptions)
                console.log(typeof selectedOptions[0])
                console.log(selectedOptions[0])
                console.log(typeof CorrectAnswer)
                console.log(CorrectAnswer)

                if (selectedOptions[0] == CorrectAnswer) {
                    questoionHandler.numsteps = 5;
                   
                    alert("Woohoo! Correct answer! You can now proceed by 5 step.");
                } else {
                    questoionHandler.numsteps = -10;
                    
                    alert("Oops! Incorrect answer! the correct answer is:-"+CorrectAnswer+" You will now move back 10 steps.");
                }
                console.log("steps inside:",questoionHandler.numsteps)
                console.log("player-inside:",questoionHandler.player)
                    modal.hide();// Close the modal after submission
                    questoionHandler.board.movePlayer( questoionHandler.board.players[0], questoionHandler.numsteps);
            });
            console.log("steps:",questoionHandler.numsteps)
            console.log("player:",questoionHandler.player)
            
            

            
    }
}

class QuestionHandler {
    constructor(board) {
        this.board = board;
        this.currentQuestion = null;
        this.numsteps = 0
        this.player = board.getCurrentPlayer();
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

    modalPopUP(){
        
            const currentPlayer = this.board.getCurrentPlayer();
            this.player = this.board.getCurrentPlayer();
            //Get modal
            var modal = $("#myModal");
            const questionText = this.currentQuestion[0].question;
            $("h2").text(questionText);
            let answerOptions = []
            answerOptions = [
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
                console.log("iam the select :",selectedOptions)
                console.log("iam the corecct answer :" ,CorrectAnswer)
                if (selectedOptions[1] == CorrectAnswer) {
                    questoionHandler.numsteps = 5;
                    alert("Woohoo! Correct answer! You can now proceed by 5 step.");
                } else {
                    questoionHandler.numsteps = -10;
                    alert("Oops! Incorrect answer! the correct answer is: "+CorrectAnswer+" You will now move back 10 steps.");
                }
                    modal.hide();
                    questoionHandler.board.movePlayer( questoionHandler.board.players[0], questoionHandler.numsteps);
            });
          
            
            

            
    }
}
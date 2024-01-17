const saveDb = require("../model/saveDataBase");
const DB = new saveDb();

class DataHandling {
    constructor(){
      this.data 
    }
   FilterData(promise, res) {
     try {
       const resp =  promise;
       const _data = resp.then((response) => {
        res.send(response.data.results);
        let result = response.data.results
        // console.log(result)
        result.results.map((key) => {
          return {
            difficulty: key.difficulty,
            category: key.category,
            type: key.type,
            question: key.question,
            correct_answer: key.correct_answer,
            incorrect_answers: key.incorrect_answers,
          };
        })
      });
      DB.saveDataToDatabase(_data);
      

    } catch (error) {
        console.error("Error in Fetching Data: ", error);
        res.status(404).send({ error: "Try again!" });
    }
  }
}

module.exports = DataHandling;

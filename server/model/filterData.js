const saveDb = require("../model/saveDataBase");
const DB = new saveDb();

class DataHandling {
  async FilterData(promise, res) {
    try {
      const resp = await promise;
      const _data = resp.data.results.map((key) => {
        return {
          difficulty: key.difficulty,
          category: key.category,
          type: key.type,
          question: key.question,
          correct_answer: key.correct_answer,
          incorrect_answers: key.incorrect_answers,
        };
      });
      DB.saveDataToDatabase(_data);
      console.log(_data);
      res.send(_data);
    } catch (error) {
      console.error("Error in Fetching Data: ", error);
      res.status(404).send({ error: "Try again!" });
    }
  }
}

module.exports = DataHandling;

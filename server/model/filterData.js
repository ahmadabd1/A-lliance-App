const saveDb = require("../model/saveDataBase");
const DB = new saveDb();

class DataHandling {
  constructor() {
    this.listData;
  }
  async FilterData(promise) {
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
      this.listData = _data;
      DB.saveDataToDatabase(_data);
      return this.listData;
    } catch (error) {
      console.error("Error in Fetching Data: ", error);
      res.status(404).send({ error: "Try again!" });
    }
  }
}

module.exports = DataHandling;

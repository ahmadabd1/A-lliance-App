const Questions = require("./QuestionsSchema");

class SaveDb {
  async saveDataToDatabase(data) {
    try {
      const savedQuestions = await Questions.create(data);
      
    } catch (error) {
      console.error("Error saving questions to the database:", error);
    }
  }
}

module.exports = SaveDb;

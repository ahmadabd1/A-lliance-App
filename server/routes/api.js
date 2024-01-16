const express = require("express");
const saveDb = require("../model/saveDataBase");
const Questions = require("../model/QuestionsSchema");
const axios = require("axios");
const DB = new saveDb();
const router = express.Router();
let _data;

router.get("/data", async (req, res) => {
  try {
    axios
      .get(`https://opentdb.com/api.php?amount=10&type=multiple`)
      .then((resp) => {
        _data = resp.data.results.map((key) => {
          return {
            difficulty: key.difficulty,
            category: key.category,
            type: key.type,
            question: key.question,
            correct_answer: key.correct_answer,
            incorrect_answers: key.incorrect_answers,
          };
        });
        res.send(_data);
        DB.saveDataToDatabase(_data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  } catch (error) {
    console.error("Error in Fetching Data: ", error);
    res.status(404).send({ error: "try again!" });
  }
});

router.delete("/deletedata", async (req, res) => {
  try {
    console.log("hi");
    Questions.deleteMany({}).then();
    res.send("delete the data");
  } catch (error) {
    console.error(error);
    res.status(404).send({ error: "Not saved! try again!" });
  }
});

module.exports = router;

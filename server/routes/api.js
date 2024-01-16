const express = require("express");
// const saveDb = require("../model/saveDataBase");
const DataHandling = require("../model/filterData");
const Questions = require("../model/QuestionsSchema");
const axios = require("axios");
// const DB = new saveDb();
const dataHandling = new DataHandling();
const router = express.Router();
router.get("/data", async (req, res) => {
  try {
    const promise = axios.get(
      "https://opentdb.com/api.php?amount=10&type=multiple"
    );
    await dataHandling.FilterData(promise, res);
  } catch (error) {
    console.error("Error in Fetching Data: ", error);
    res.status(500).send({ error: "Internal Server Error" });
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

router.get("/categories", async (req, res) => {
  try {
    const categories = await Questions.distinct("category");

    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

const express = require("express");
const DataHandling = require("../model/filterData");
const Questions = require("../model/QuestionsSchema");
const axios = require("axios");
const GetcategoryData = require("../consts");
const dataHandling = new DataHandling();
const router = express.Router();
const saveDb = require("../model/saveDataBase");
const DB = new saveDb();




router.get("/data", async (req, res) => {
  try {
    const promise = await axios.get("https://opentdb.com/api.php?amount=100&type=multiple");
    const resData = dataHandling.FilterData(promise);
    // setTimeout(() => {
    //   res.send(resData);
    // }, 1000);

    res.end();
  } catch (error) {
    console.error("Error in Fetching Data: ", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.get("/dbdata", async (req, res) => {
  try {
    
    function getRandom(min, max) {
      return Math.ceil(Math.random() * (max - min) + min);
    }

    let max = await Questions.countDocuments({}).then();
    let randomNum = getRandom(1, max)
    Questions.findOne({}).skip(randomNum).then(function (question) {
      res.send(question)
  })
    
  } catch (error) {
    console.error("Error in Fetching Data: ", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.delete("/deletedata", async (req, res) => {
  try {
    Questions.deleteMany({}).then();
    res.send("delete the data");
  } catch (error) {
    console.error(error);
    res.status(404).send({ error: "Not saved! try again!" });
  }
});

router.get("/categories/:category", async (req, res) => {
  let index = 21;
  const data = GetcategoryData.categoryData;
  try {
    for (index in data) {
      if (data[index] === req.params.category) {
        const apicatgoryData = axios.get(
          `https://opentdb.com/api.php?amount=100&category=${index}&type=multiple`
        );
        const resData = dataHandling.FilterData(apicatgoryData);
        res.end()

        // apicatgoryData.then((res) => {
        //   dataResult = res.data.results;
        //   display(dataResult);
        // });
      }
    }
    // function display(questionArray) {
    //   res.status(200).json(questionArray);
    // }
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

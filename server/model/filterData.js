const saveDb = require("../model/saveDataBase");
const DB = new saveDb();

class DataHandling {
  constructor() {
    this.listData = [];
  }
  FilterData(promise) {
    try {
      const resp = promise;
      const _data = resp.then((result) => {
        console.log(result.data.results[0]);
        result.data.results.forEach((element) => {
          this.listData.push(element);
        });
      });
      DB.saveDataToDatabase(this.listData);
      return this.listData;
    } catch (error) {
      console.error("Error in Fetching Data: ", error);
      res.status(404).send({ error: "Try again!" });
    }
  }
}

module.exports = DataHandling;

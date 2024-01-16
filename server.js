const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const GameAPI = require("./server/routes/api");

mongoose.connect("mongodb://127.0.0.1:27017/AllianceDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.static(path.join(__dirname, "./dist")));
// app.use(express.static(path.join(__dirname, "./bgMusic")));
app.use(express.static(path.join(__dirname, "node_modules")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", GameAPI);

const PORT = 8585;
app.listen(process.env.PORT || PORT, function () {
  console.log(`Running on port ${PORT}`);
});

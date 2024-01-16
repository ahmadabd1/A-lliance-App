const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    name: String,
    
})


const Questions = mongoose.model("question", questionSchema)
module.exports = Questions
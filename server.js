const express = require('express')
const path = require('path')
const app = express()
const weatherAPI = require('./server/routes/api')
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/{name DB}", {
  useNewUrlParser: true,
}).catch((err)=> console.log(err))


app.use(express.static(path.join(__dirname, './dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', weatherAPI)


const PORT = 8585
app.listen(process.env.PORT || PORT, function () {
    console.log(`Running on port ${PORT}`)
})
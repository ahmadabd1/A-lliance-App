const express = require('express')
const router = express.Router()








router.get('/weather/:cityName', async (req, res) => {
   
    try {
       
       
    }
    catch (error) {
        console.error("Error in Fetching Data: ", error)
        res.status(404).send({ error: "try again!" });
    }
})


router.post('/weather', async (req, res) => {
    try {
       
    }
    catch (error) {
        console.error(error)
        res.status(404).send({ error: "Not saved! try again!" });
    }
})

router.put('/weather', async (req, res) => {
    try {
       
    }
    catch (error) {
        console.error(error)
        res.status(404).send({ error: "Not saved! try again!" });
    }
})




router.delete('/weather/:cityName', async (req, res) => {
    try {
      
    }
    catch (error) {
        console.error(error)
        res.status(404).send({ error: "Not Found!" });
    }
})


module.exports = router
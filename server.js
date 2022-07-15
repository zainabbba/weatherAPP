const express = require('express')
const bodyParser = require('body-parser')

dataset = {}
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8080
const server = app.listen(port, listening)
function listening() {
    console.log('Server running')
    console.log(`running on localhost:${port}`)
};



app.get('/all', sendData);


function sendData(req, res) {
    res.send(dataset)
}

app.post('/add', addData)


function addData(req, res) {
    newentry = {
        date: req.body.date,
        temp: req.body.temp,
        user_response: req.body.user_response


    }

    dataset = newentry;
    res.send(dataset)
    console.log(dataset);
}
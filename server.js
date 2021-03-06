// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 4000;

const server = app.listen(port, listening);

function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

//const weatherData = [];

app.get('/all', getData);

function getData (request, response) {
  response.send(projectData);
  console.log(projectData);
};

// POST route
app.post('/addweather', addweather);

function addweather(req,res){
  
 /* newEntry = {
      temp: req.body.temp , date: req.body.date , content: req.body.content
  } */

  projectData = req.body;
  res.send(projectData);
  console.log(projectData);

};


// ----------------------------------------------------------------------------------------------//


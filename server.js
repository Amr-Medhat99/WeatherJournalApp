// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express=require('express');
// Start up an instance of app
const app=express();
/* Middleware*/
const bodyParser=require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port=3000;
//when server is launch in port 3000 successfully that output in terminal message run successfully and the port number
const serverLaunch=app.listen(port,listener);
function listener()
{
    console.log(`setup running successfully at port: ${port}`);
}

//get route (return all data)
app.get('/returnAll',returnData);
function returnData(req,res){
    res.send(projectData);
}

//post route(post data in endpoint object)
app.post('/addElement',addData);
function addData(req,res){
    let newEntery={
        temperature:req.body.temp,
        date:req.body.date,
        userResponse:req.body.content
    }
    projectData=newEntery;
}
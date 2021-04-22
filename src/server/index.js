/* Dependencies  */
const dotenv = require('dotenv');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require("node-fetch");
const { validate } = require('webpack');
var FormData = require('form-data');
var fs = require('fs');
var https = require('https');

dotenv.config();

/* Start Server */
//Start an instance of the app
const app = express()
//Spin up the server
const port = 8081
app.listen(port, function () {
  console.log('NPL Evaluator is listening on port 8081! - http://localhost:8081/')
 })
//Initialize the main project folder
app.use(express.static("dist"))

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/* Routing */

app.post("/summarize",(req,res) =>{

  var type = req.body.type;
  var format_type = req.body.format_type;
  var value = req.body.value;

  fetch(encodeURI(`https://api.meaningcloud.com/sentiment-2.1${constructParameters(process.env.API_KEY,type,format_type,value)}`))
  .then(response => response.json())
  .then(data => {

    let sentiment = {
      status: data.status,
      score_tag: data.score_tag,
      agreement: data.agreement,
      subjectivity: data.subjectivity,
      confidence: data.confidence,
      irony: data.irony
    };

    console.log(sentiment);
    res.send(sentiment);
  });
})

app.get("/",(req,res) =>{
  console.log(__dirname);
  res.sendFile('dist/index.html');
})

/* Functions */

function constructParameters(key,type,format_type,value){
  let parameters =[
    `key=${key}`,
    `of=json`,
    `lang=en`,
    `ilang=en`,
    `${type}=${value}`,
    `"txtf=${format_type}`,
    `model=general`,
    `verbose=n`,
    `egp=n`,
    `rt=n`,
    `uw=n`,
    `dm=s`,
    `sdg=l`,
    `cont=printing`
  ]
  let params = "?";

  for(let i = 0; i < parameters.length; i++){
    params += parameters[i] + "&";
  }

  console.log(params);
  return params;
}



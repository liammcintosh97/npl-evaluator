/* Dependencies  */
const dotenv = require('dotenv');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require("node-fetch");
const { validate } = require('webpack');

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


  var sentence = req.body.sentence;
  var type = req.body.type;
  var value = req.body.value;

  let validation = validateData(type,value);
  let resBody = {
    data: undefined,
  }
  Object.assign(resBody,resBody,validation);


  if(validation.status === "failed"){
    res.send(resBody);
    return;
  }

  var parameters = `?key=${process.env.API_KEY}&sentences=${sentence}&${getTypeParameters(type)}${value}`;
  console.log(parameters);
  fetch(encodeURI(`https://api.meaningcloud.com/summarization-1.0${parameters}`))
  .then(response => response.json())
  .then(data => {
    resBody.data = data;

    res.send(resBody);
  });
})

app.get("/",(req,res) =>{
  console.log(__dirname);
  res.sendFile('dist/index.html');
})

/* Functions */

function getTypeParameters(type){

  switch(type){
     case "file":
       return "doc="
      case "url":
        return "url=";
      case "text":
        return "txt=";
   }
}

function validateData(type,value){

  console.log(value);

  if(value === undefined || value === null || value === ""){
    return {
      status: "failed",
      msg: `The ${type} you submitted is undefined`
    };
  }

  switch(type){
     case "url":
        if(/^(ftp|http|https):\/\/[^ "]+$/.test(value) === false){
          return {
            status: "failed",
            msg: "The entered url is not valid",
          };
        }
        else{
          return {
            status: "success"
          }
        }
    default:
      return {
        status: "success"
      }
  }
}
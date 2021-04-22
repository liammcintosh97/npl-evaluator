import "regenerator-runtime/runtime.js";
import { getTypeParameter} from "./typeSelector.js";
import { getTextFormatParameter} from "./dropDown.js";

const baseSeverURL = "http://localhost"
const serverPort = ":8081"

let selectedType;
let selectedTextFormat;
let submitButton;
let sentimentElement;
let submissionValue;
let formFields;

export function initializeForm(){
  submitButton = document.getElementById("submit-button");
  sentimentElement = document.getElementsByClassName("sentiment")[0];
  formFields = getFormFields();

  submitButton.addEventListener("click",onFormSubmit)
}

function getFormFields(){
  let fields = {
    file: null,
    url: null,
    text: null,
  }

  let fieldElements = document.getElementsByClassName("type-input-container");

  for(let i = 0; i < fieldElements.length; i++){

    switch(fieldElements[i].id){
      case "file":
        fields.file = fieldElements[i].getElementsByTagName("input")[0];
        break;
      case "url":
        fields.url = fieldElements[i].getElementsByTagName("input")[0];;
        break;
      case "text":
        fields.text = fieldElements[i].getElementsByTagName("textarea")[0];;
        break;
    }
  }

  return fields;
}

async function onFormSubmit(){
  selectedTextFormat =  document.getElementsByClassName("selection")[0].innerText;
  selectedType = document.getElementsByClassName("selected")[0].innerText;
  submissionValue = getSubmissionValue(selectedType);

  console.log(submissionValue);

  var data = {
    type: getTypeParameter(selectedType),
    format_type: getTextFormatParameter(selectedTextFormat),
    value: submissionValue
  }

  let validation = validateValue(selectedType,submissionValue);

  if(validation.status === "failed"){
    alert(validation.msg);
    return;
  }

  PostData(`${baseSeverURL}${serverPort}/summarize`,data).then(res =>{
    console.log(res);
    sentimentElement.innerText = formatSentiment(res);

  });
}

function getSubmissionValue(_selectedType){

  switch(_selectedType){
    case "file":
      return formFields.file.files[0];
    case "url":
      return formFields.url.value;
    case "text":
      return formFields.text.value;
  }
}

async function PostData(url,data){
  console.log(`Posting

  Data: ${JSON.stringify(data)}
  To: ${url}`);

  const response = await fetch(url,{
    method: 'POST',
    credentials: 'same-origin',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try{
    const data = await response.json();
    console.log(`POST was successful: ${JSON.stringify(data)}`);
    return data;
  }catch(error){
    console.log("error",error);
  }
}

function formatSentiment(sentimentData){
  return `Score Tag: ${sentimentData.score_tag}
  Agreement: ${sentimentData.agreement}
  Subjectivity: ${sentimentData.subjectivity}
  Confidence: ${sentimentData.confidence}
  Irony: ${sentimentData.irony}
  `
}

export function validateValue(type,value){

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

export default{
  initializeForm,
  validateValue,
}
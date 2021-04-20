import "regenerator-runtime/runtime.js";

const baseSeverURL = "http://localhost"
const serverPort = ":8081"

let selectedType;
let sentenceLength;
let submitButton;
let summaryElement;
let fields;

export function initializeForm(){
  submitButton = document.getElementById("submit-button");
  summaryElement = document.getElementsByClassName("summary")[0];
  fields = getFields();

  submitButton.addEventListener("click",onFormSubmit)
}

function getFields(){
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
  sentenceLength =  document.getElementsByClassName("selection")[0].innerText;
  selectedType = document.getElementsByClassName("selected")[0].innerText;
  let submissionData = getSubmissionData(selectedType);

  var data = {
    type: selectedType,
    sentence: sentenceLength,
    value: submissionData
  }

  PostData(`${baseSeverURL}${serverPort}/summarize`,data).then(res =>{

    if(res.status === "failed"){
      alert(res.msg);
    }
    else{
      summaryElement.innerText = res.data.summary
    }

  });
}

function getSubmissionData(_selectedType){

  switch(_selectedType){
    case "file":
      console.log(fields.file);
      console.log(JSON.stringify(fields.file.files[0]));
      return fields.file.files[0];
    case "url":
      return fields.url.value;
    case "text":
      return fields.text.value;
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
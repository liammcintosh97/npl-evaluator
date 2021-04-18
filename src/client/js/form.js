let selectedType;
let sentenceLength;
let submitButton;
let fields;

export function initializeForm(){
  selectedType = document.getElementsByClassName("selected")[0].innerText;
  sentenceLength =  document.getElementsByClassName("selection")[0].innerText;
  submitButton = document.getElementById("submit-button");
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
        fields.file = fieldElements[i];
        break;
      case "url":
        fields.url = fieldElements[i];
        break;
      case "text":
        fields.text = fieldElements[i];
        break;
    }
  }

  return fields;
}

function onFormSubmit(){

  let submissionData = getSubmissionData(selectedType);

  console.log(`Selected type is ${selectedType}`);
  console.log(`Sentence length is ${sentenceLength}`);
  console.log(`The submission data is ${submissionData}`);

}

function getSubmissionData(_selectedType){

  switch(_selectedType){
    case "file":
      return fields.file.value;
    case "url":
      return fields.url.value;
    case "text":
      console.log(fields.text);
      return fields.text.value;
  }
}
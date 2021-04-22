
export function initializeDropDowns(){

  let dropDowns = document.getElementsByClassName("dropdown");

  for(let i = 0 ; i < dropDowns.length; i++){
    var contentElement = dropDowns[i].getElementsByClassName("content")[0];
    var selectionElement =  dropDowns[i].getElementsByClassName("selection")[0];

    contentElement.addEventListener("click",onContentClick);
  }
}

function onContentClick(event){

  if(event.target.className === "option"){
    let option = event.target;
    let selection = option.innerText;
    let selectionElement = option.parentElement.parentElement.getElementsByClassName("selection")[0]

    selectionElement.innerText = selection;
  }
}

export function getTextFormatParameter(textFormat){
  switch(textFormat){
    case "Plain Text":
      return "plain"
     case "Markup Language":
       return "markup";
  }
}

export default{
  getTextFormatParameter,
  initializeDropDowns
}
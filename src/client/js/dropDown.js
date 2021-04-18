
export function initializeDropDowns(){

  let dropDowns = document.getElementsByClassName("dropdown");

  for(let i = 0 ; i < dropDowns.length; i++){
    var contentElement = dropDowns[i].getElementsByClassName("content")[0];
    var selectionElement =  dropDowns[i].getElementsByClassName("selection")[0];

    contentElement.addEventListener("click",onContentClick.bind(selectionElement));
  }
}

function onContentClick(event,selectionElement){

  if(event.target.className === "option"){
    let option = event.target;
    let selection = option.innerText;
    let selectionElement = option.parentElement.parentElement.getElementsByClassName("selection")[0]

    selectionElement.innerText = selection;
  }
}
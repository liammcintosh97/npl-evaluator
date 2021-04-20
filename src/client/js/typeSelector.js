const types = {
  file: "file",
  url: "url",
  text: "text"
}

let selectors = [];
let summaryElement;

class TypeSelector{

  constructor(_selector,_formField,_type){
    this.selector = _selector,
    this.formField = _formField,
    this.type = _type
    this.selected = false;
  }

  select(_selected){
    this.selected = _selected;

    //Was Selected
    if(_selected){
      this.formField.style.display = "flex"
      this.selector.style.textDecoration = "underline"
      this.selector.classList.add("selected");
    }
    //Wasn't Selected
    else{
      this.formField.style.display = "none"
      this.selector.style.textDecoration = "unset"
      this.selector.classList.remove("selected");
    }
  }
}


export function initializeTypeSelectors(){
  let subHeading = document.getElementsByClassName("sub-heading")[0];
  let selectorElements = document.getElementsByClassName("type-selector");
  let fieldElements = document.getElementsByClassName("type-input-container");
  summaryElement = document.getElementsByClassName("summary")[0];

  subHeading.addEventListener("click",onSubHeadingClick)

  for(let i = 0; i < selectorElements.length; i++){
    let type = selectorElements[i].id;

    for(let j = 0; j < fieldElements.length; j++){
      if(type === fieldElements[j].id){
        let typeSelector = new TypeSelector(selectorElements[i],fieldElements[j],type);
        selectors.push(typeSelector);
      }
    }
  }

  getSelector(types.text).select(true);
}

function getSelector(_type){
  for(let i = 0; i < selectors.length; i++){
    if(_type === selectors[i].type) return selectors[i];
  }
}

function onSubHeadingClick(event){
  if(event.target.className === "type-selector"){
    updateSelectors(event.target);
  }
  else{
    console.log("Didn't click type-selector")
  }
}

function updateSelectors(clickedSelector){

  summaryElement.innerText = "";
  let selectedType = clickedSelector.id;

  for(let i = 0; i < selectors.length; i++){
    if(selectedType === selectors[i].type){
       selectors[i].select(true)
    }
    else{
      selectors[i].select(false)
    }
  }
}



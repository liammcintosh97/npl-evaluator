import { getTypeParameter,initializeTypeSelectors,} from "./js/typeSelector.js";
import { getTextFormatParameter,initializeDropDowns} from "./js/dropDown.js";
import {initializeForm,validateValue} from "./js/form.js";
import "./styles/main.scss";

initializeTypeSelectors();
initializeDropDowns();
initializeForm();

export default {getTypeParameter,
  initializeTypeSelectors,
  getTextFormatParameter,
  initializeDropDowns,
  initializeForm,
  validateValue,};
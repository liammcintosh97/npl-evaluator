import { initializeTypeSelectors } from "./js/typeSelector.js";
import { initializeDropDowns} from "./js/dropDown.js";
import {initializeForm} from "./js/form.js";
import "./styles/main.scss";

initializeTypeSelectors();
initializeDropDowns();
initializeForm();

export default {initializeTypeSelectors,initializeDropDowns,initializeForm};
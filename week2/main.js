/*
pull existing state of the checkbox from LS
update checkbox
if the checkbox is checked: show the input form
else hide it.

pull existing expenses from localstorage
render the expenses

when the enter button is clicked:
    get form contents
    update LS with the form contents
    reset the form
    re-render expense list

*/

import { saveExpense } from "./expenseTracker.mjs";

let checkState = localStorage.getItem("checkState");
const inputCheckbox = document.querySelector("#allowInput");
inputCheckbox.checked = checkState === "true" ? true : false;
console.log(checkState);
function toggleInput() {
  if (inputCheckbox.checked) {
    document.querySelector("#input").classList.remove("hide");
  } else {
    document.querySelector("#input").classList.add("hide");
  }
  localStorage.setItem("checkState", inputCheckbox.checked ? "true" : "false");
}

toggleInput();

function saveHandler(e) {
  const description = document.querySelector("#description");
  const amount = document.querySelector("#amount");
  const newExpense = {
    description: description.value,
    amount: amount.value
  };
  saveExpense(newExpense);
  description.value = "";
  amount.value = "";
}

inputCheckbox.addEventListener("change", toggleInput);
document.querySelector("#submit").addEventListener("click", saveHandler);

function renderExpenses(expenses) {
  const html = expenses.map(expenseTemplate);
  document.querySelector(".outputBody").innerHTML = html.join("");
}

function expenseTemplate(expense) {
  return `<tr>
    <td>${expense.description}</td>
    <td>$${expense.amount}</td>
    <td>$10</td>
  </tr>`;
}

export function saveExpense(expense) {
  console.log("save");
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses(expenses);
}

const options = {
  url: "localhost",
  name: "myName"
};

function myFunction({ url, name }) {
  // do some stuff
  console.log(url, name);
}

function myFunction(options) {
  // do some stuff
  const url = options.url;
  const name = options.name;
  console.log(url, name);
}

myFunction(options);

function double(num) {
  // if (true) {
  //   let one = 1;
  // }
  // console.log(one);
  return num * 2;
}

const doubleExp = function (num) {
  return num * 2;
};

const doubleArrow = (num) => num * 2;
const triple = (num) => num * 3;

function doStuff(num, callback) {
  const result = callback(num);
  return result;
}

function manipulateList(list, callback) {
  const doubled = [];
  list.forEach((element) => {
    doubled.push(callback(element));
  });
  return doubled;
}

const newList = manipulateList([1, 2, 3], double);

const mapList = [1, 2, 3].map(double);

doStuff(3, double);
doStuff(4, triple);

const url = "https://pokeapi.co/api/v2/type";

async function getTypes() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

function typeTemplate(type) {
  return `<li>${type.name}</li>`;
}

function renderTypes(types) {
  const html = types.map(typeTemplate);
  const listElement = document.querySelector("#typesList");
  listElement.innerHTML = html.join("");
  console.log(types);
}

async function init() {
  const types = await getTypes();
  renderTypes(types.results);
}

init();

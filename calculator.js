const calculatorPad = [
  ["%", "/", "AC", " "],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", " ", ".", "="],
];

let displayArray = [];
const displayElement = document.querySelector("#calculator-display");
const calculatorEl = document.querySelector("#calculator-body");

function renderRowButtons(row) {
  let buttonRow = [];

  row.forEach((sign, index) => {
    if (sign === " ") return;
    const buttonEl = document.createElement("button");
    if (row[index + 1] === " ") {
      buttonEl.className = "expanded-button";
    }

    buttonEl.id = `${sign}`;
    buttonEl.textContent = sign;
    buttonRow.push(buttonEl);
  });

  return buttonRow;
}

for (let row of calculatorPad) {
  for (let button of renderRowButtons(row)) {
    calculatorEl.appendChild(button);
  }
}

const addToDisplayArray = (sign) => {
  if (Number.isNaN(Number(sign)) && Number.isNaN(Number(displayArray.at(-1)))) {
    return;
  }

  displayArray.push(sign);
};

for (let sign of calculatorPad.flat()) {
  let buttonQuery = document.querySelector(`[id="${sign}"]`);
  if (!buttonQuery) continue;
  buttonQuery.addEventListener("click", handleSignClick);
}

function handleSignClick(event) {
  let sign = event.target.id;
  let mathSign = sign;

  if (sign === "AC") {
    displayArray = [""];
    displayElement.textContent = "0";
  } else if (sign === "=") {
    const result = eval(displayArray.join(""));
    displayArray = [result];
    displayElement.textContent = result;
  } else if (sign !== " ") {
    addToDisplayArray(mathSign);
    displayElement.textContent = displayArray.join("");
  }
}

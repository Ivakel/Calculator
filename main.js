function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  return true;
}

let button = document.querySelectorAll("#nums");
let display = document.querySelector("#display");
const equals = document.querySelector(".equals");
let equals_clicked = false;
const delete_button = document.querySelector(".delete");
const cancel_button = document.querySelector(".cancel");
const answer = document.querySelector(".answer");

answer.addEventListener("click", () => {
  const ANS = answer.innerText;
  if (ANS !== "ANS") {
    if (isAnswer() === true) {
      display.value = ANS;
    } else {
      display.value += ANS;
    }
  }
});

cancel_button.addEventListener("click", () => {
  display.value = "";
});

delete_button.addEventListener("click", () => {
  display.value = display.value.slice(0, -1);
});

function isAnswer() {
  return display.value.substr(display.value.length - 1) === "=";
}

function intNum(num) {
  return num.slice(-3, num.length) === ".00";
}

//When the user is attempting to evaluate the input
equals.addEventListener("click", () => {
  const value = display.value;
  equals_clicked = true;

  try {
    let solution = eval(display.value);
    if (Number.isInteger(solution)) {
      display.value = solution.toFixed(2);
      if (intNum(display.value)) {
        display.value = display.value.slice(0, -3);
      }
      answer.innerText = display.value;
    }
  } catch {
    display.value = "INVALID EXP";
  }
});

button.forEach((button_id) => {
  button_id.addEventListener("click", () => {
    if (isAnswer() || display.value === "INVALID EXP") {
      display.value = "";
    }
    if (equals === true) {
      equals = false;
      display.value = "";
    }
    if (button_id.innerHTML === ",") {
      display.value += ".";
    } else if (button_id.innerHTML === "÷") {
      display.value += "/";
    } else {
      display.value += button_id.innerText;
    }
  });
});

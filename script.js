// global variables
let firstNum = '';
let secondNum = '';
let operator = '';
let reDot = /[.]/g;

// capturing keyboard input
document.addEventListener("keydown", function(e) {
  let key = e.key;
  console.log(`key pressed: ${key}`);
  keyReading(key);
  console.log(`first num: ${firstNum}`);
  console.log(`sec num: ${secondNum}`);
  console.log(`operator: ${operator}`);
})

// capturing each button when clicked
let buttons = document.querySelectorAll('button');

buttons.forEach(button => button.addEventListener("click", function(e) {
  let key = this.innerHTML; // a string representing the key
  console.log(`key pressed: ${key}`);
  keyReading(key);
  console.log(`first num: ${firstNum}`);
  console.log(`sec num: ${secondNum}`);
  console.log(`operator: ${operator}`);
}));

// processing de key input for each press
function keyReading(key) {
  switch (key) {
    case '.':
      decimal(key);
      break;
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      numAssign(key);
      document.getElementById("clearAll").innerHTML = 'C';
      break;
    case '+':
    case '−':
    case '-':
    case '×':
    case '*':
    case '÷':
    case '/':
      if (secondNum !== '') {
        operate();
      }
      operator = key;
      break;
    case '=':
    case 'Enter':
      if (secondNum == '') {
        document.getElementById("display").innerHTML = 'Missing Num';
        break;
      } else {
        operate();
        break;
      }
    case 'AC':
    case 'Escape':
      display(0);
      clearAll();
      break;
    case 'C':
      clear();
      document.getElementById("clearAll").innerHTML = 'AC';
      break;
    case '+/−':
    case '`':
      signChange();
      break;
    case '%':
      percent();
      break;
    case '↩':
    case 'Backspace':
      back();
      break;
    }
}

// individual operations
function numAssign(key) {
  if (operator == '') {
    firstNum += key;
    display(firstNum);
  } else {
    secondNum += key;
    display(secondNum);
  }
}

function decimal(key) {
  if (operator == '') {
    if (firstNum.search(reDot) == -1) { // returns -1 if cannot find '.' dot punctuation
      numAssign(key);
    }
  } else {
    if (secondNum.search(reDot) == -1) { // returns -1 if cannot find '.' dot punctuation
      numAssign(key);
    }
  }
}

function signChange() {
  if (operator == '') {
    firstNum *= -1;
    display(firstNum);
  } else {
    secondNum *= -1;
    display(secondNum);
  }
}

function percent() {
  if (operator == '') {
    firstNum *= 0.01;
    display(firstNum);
  } else {
    secondNum *= 0.01;
    display(secondNum);
  }
}

function clearAll() {
  firstNum = '';
  secondNum = '';
  operator = '';
}

function clear() {
  if (operator == '') {
    firstNum = '';
    display(firstNum);
  } else {
    secondNum = '';
    display(secondNum);
  }
}

function back() {
  if (operator == '') {
    firstNum = firstNum.substring(0, firstNum.length - 1);
    display(firstNum);
  } else {
    secondNum = secondNum.substring(0, secondNum.length - 1);
    display(secondNum);
  }
}

function operate() {
  switch (operator) {
    case '+':
      let add = Number(firstNum) + Number(secondNum);
      display(add);
      firstNum = add;
      break;
    case '−':
      let sub = Number(firstNum) - Number(secondNum);
      display(sub);
      firstNum = sub;
      break;
    case '×':
      let mul = Number(firstNum) * Number(secondNum);
      display(mul);
      firstNum = mul;
      break;
    case '÷':
      if (secondNum == 0) {
        document.getElementById("display").innerHTML = 'Error: div 0';
        break
      } else {
        let div = Number(firstNum) / Number(secondNum);
        display(div);
        firstNum = div;
        break;
      }
  }
  secondNum = '';
}

// display any output on the calculator screen
function display(display) {
  let str = display.toString();
  let strLength = str.length;

  if (strLength >= 7) {
    let round = Number(display).toPrecision(6);
    document.getElementById("display").innerHTML = round;
  } else {
    document.getElementById("display").innerHTML = display;
  }
}

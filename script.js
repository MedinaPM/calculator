// global variables
let firstNum = '';
let secondNum = '';
let operator = '';
let reDot = /[.]/g;

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
      break;
    case '+':
    case '−':
    case '×':
    case '÷':
      if (secondNum !== '') {
        operate();
      }
      operator = key;
      break;
    case '=':
      if (secondNum == '') {
        document.getElementById("display").innerHTML = 'Missing Num';
        break;
      } else {
        operate();
        break;
      }
    case 'c':
      display(0);
      clear();
      break;
    case '+/−':
      signChange();
      break;
    case '%':
      percent();
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

function clear() {
  firstNum = '';
  secondNum = '';
  operator = '';
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
      let div = Number(firstNum) / Number(secondNum);
      display(div);
      firstNum = div;
      break;
  }
  secondNum = '';
}

// display any output on the calculator screen
function display(display) {
  let str = display.toString();
  let strLength = str.length;

  if (strLength >= 11) {
    let round = Number(display).toPrecision(10);
    document.getElementById("display").innerHTML = round;
  } else {
    document.getElementById("display").innerHTML = display;
  }
}

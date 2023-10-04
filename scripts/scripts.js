//Para que funcione, necesita que carge todo el archivo HTML y CSS
document.addEventListener("DOMContentLoaded", () => {

  const displayTop = document.getElementById('save-values');
  const displayBottom = document.getElementById('first-value');
  const numbers = [
    document.getElementById("num0"),
    document.getElementById("num1"),
    document.getElementById("num2"),
    document.getElementById("num3"),
    document.getElementById("num4"),
    document.getElementById("num5"),
    document.getElementById("num6"),
    document.getElementById("num7"),
    document.getElementById("num8"),
    document.getElementById("num9"),
    document.getElementById("pi"),
    document.getElementById("decimal"),
  ];
  const operators = [
    document.getElementById("percentage"),
    document.getElementById("fraction"),
    document.getElementById("square"),
    document.getElementById("square-root"),
    document.getElementById("divide"),
    document.getElementById("multiply"),
    document.getElementById("subtract"),
    document.getElementById("add"),
    document.getElementById("toggle-sign"),
  ];

  const equal = document.getElementById("equals");
  const deleteAllButton = document.getElementById("clear");
  const deleteOneButton = document.getElementById("backspace");

  //Variables
  let num1 = '';
  let num2 = '';
  let operator = '';
  let result = 0;
  let operatorActive = false;

  //Muestra (incluyendo PI) cada boton numerico
  const numberInput = (event) => {
    let number = parseFloat(event.target.value);
    if (event.target.value === '.' && !displayBottom.innerText.includes(event.target.value)) {
      displayBottom.innerText += event.target.value;
    }
    if (event.target.id === "pi") {
      number = Math.PI.toFixed(5);
      displayBottom.innerText = number;
    }
    if (number || number === 0) {

      if (displayBottom.innerText.length <= 5) {
        const operator = operators.find(f => f.value === displayTop.innerText.slice(displayTop.innerText.length - 1));
    

        if (displayBottom.innerText === '0' || (operator && operatorActive)) {
          displayBottom.innerText = number;
          operatorActive = false;
        } else {
          displayBottom.innerText += number;
        }
      }

    }
    
    operatorActive = false;
  }

  const operatorInput = (event) => {
    switch (event.target.id) {
      case 'percentage':
        percentage();
        break;

      case 'fraction':
        fraction();
        break;

      case 'square':
        square();
        break;

      case 'square-root':
        squareRoot();
        break;

      case 'toggle-sign':
        toggleSign();
        break;

      case 'add':
        add();
        break;

      case 'divide':
        divide();
        break;

      case 'multiply':
        multiply();
        break;

      case 'subtract':
        subtract();
        break;

      case 'equals':
        equals();
        break;

      default:
        break;


    }
  }

  const equals = () => {
    if (displayTop.innerText === '0') {
      displayTop.innerText = displayBottom.innerText
      displayBottom.innerText = 0
    } else {
      result = eval(displayTop.innerText + displayBottom.innerText)
      displayBottom.innerText = result
      displayTop.innerText = 0
    }
  }


  //Borrar
  const deleteAll = event => {
    if (event.target.id === 'clear') {
      displayBottom.innerText = 0;
      displayTop.innerText = 0;

    }
  }
  /*OPERACIONES*/
  const percentage = () => {
    result = (num1 * 100) / num2;

  }

  const fraction = () => {
    return 1 / num1;
  }

  const square = () => {
    result = Math.pow(num1, 2);
    displayBottom.innerText = result;
    displayTop.innerText = '';
  }

  const squareRoot = () => {
    result = Math.sqrt(num1);
    displayBottom.innerText = result;
    displayTop.innerText = '';
  }

  const divide = () => {
    if (displayBottom === 0) {
      return 'ERROR';
    }
    else {
      operatorActive = true;
      displayTop.innerText = 
          (displayTop.innerText !== '0' ? displayTop.innerText : displayBottom.innerText) + ' /';
      displayBottom.innerText = '0';
    }
  }

  const multiply = () => {
    operatorActive = true;
    displayTop.innerText = 
        (displayTop.innerText !== '0' ? displayTop.innerText : displayBottom.innerText) + ' *';
    displayBottom.innerText = '0';
  }

  const subtract = () => {
    operatorActive = true;
    displayTop.innerText = 
        (displayTop.innerText !== '0' ? displayTop.innerText : displayBottom.innerText) + ' -';
    displayBottom.innerText = '0';
  }

  const add = () => {
    operatorActive = true;
    displayTop.innerText = 
        (displayTop.innerText !== '0' ? displayTop.innerText : displayBottom.innerText) + ' +';
    displayBottom.innerText = '0';


  }

  const toggleSign = () => {
    result = num1 * -1;
  }


  //Recorre cada input
  numbers.forEach(n => {
    n.addEventListener('click', numberInput);
  });

  operators.forEach(o => {
    o.addEventListener('click', operatorInput);
  })

  deleteAllButton.addEventListener('click', deleteAll);
  equal.addEventListener('click', equals)
  
})
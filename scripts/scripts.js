/**
 * 
 * @author Laura López Alonso
 * GitHub: https://github.com/laurity/calculadora-windows-js.git
 * 
 */

//Para que funcione, necesita que carge todo el archivo HTML y CSS
document.addEventListener("DOMContentLoaded", () => {

  //Llamadas a los id de las etiquetas html
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
  const historialContent = document.getElementById('historial-calculator');
  const deleteHistorial = document.getElementById("delete-historial");

  //Variable para activar/desactivar la funcion de un operador
  let operatorActive = false;
  let saveHistorial;

  //Muestra los numeros (incluyendo PI y ,)
  const numberInput = (event) => {
    let number = parseFloat(event.target.value);
    if (event.target.value === '.' && !displayBottom.innerText.includes(event.target.value)) { //Evito que se incluya mas de una ,
      displayBottom.innerText += event.target.value;
    }
    if (event.target.id === "pi") { //Añado PI
      number = Math.PI;
      displayBottom.innerText = number;
    }
    if (number || number === 0) {
      if (displayBottom.innerText.length <= 15) { //Añado un tope de caracteres para poder incluir en la operación
        const operator = operators.find(f => f.value === displayTop.innerText.slice(displayTop.innerText.length - 1)); //Busca el operador añadido si es igual al último caracter de DisplayTop
        if (displayBottom.innerText === '0' || (operator && operatorActive)) { //Reemplaza el número
          displayBottom.innerText = number;
          operatorActive = false;
        }
        else { //Lo añade
          displayBottom.innerText += number;
        }
      }
    }
    operatorActive = false; //Desactiva el operador
  }
  //Guarda las funciones de los operadores
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

    }
  }
  //Si le doy al equals, realiza la función
  const equals = () => {
    if (displayTop.innerText === '0') { //Si displayTop es igual a 0, pasa a ser 0
      displayTop.innerText = displayBottom.innerText;
      displayBottom.innerText = '0';
    }
    else {  //Realiza las operaciones
      const result = eval(displayTop.innerText + displayBottom.innerText);
      saveHistorial = displayTop.innerText + ' ' + displayBottom.innerText + ' = ' + result; 
      displayBottom.innerText = result.toString();
      displayTop.innerText = '0';
      createHistorial();
      
    }
  }

  //Borrar Todo
  const deleteAll = event => {
    if (event.target.id === 'clear') {
      displayBottom.innerText = 0;
      displayTop.innerText = 0;
    }
  }
  //Borrar solo un caracter
  const deleteOne = event => {
    if (event.target.id === 'backspace') {
      displayBottom.innerText = displayBottom.innerText.slice(0, -1);
      if (displayBottom.innerText.length === 0) {
        displayBottom.innerText = 0;
      }
    }
  }

  /*OPERACIONES*/
  const percentage = () => {
    let inputValue = parseFloat(displayBottom.innerText);
    inputValue = inputValue / 100;
    displayBottom.innerText = inputValue.toString();
  }

  const fraction = () => {
    operatorActive = true;
    const inputValue = parseFloat(displayBottom.innerText);
    if (inputValue !== 0) {
      const result = 1 / inputValue;
      displayTop.innerText = `1 / ${inputValue}`;
      displayBottom.innerText = result.toString();
    }
  }

  const square = () => {
    operatorActive = true;
    const inputValue = parseFloat(displayBottom.innerText);
    if (inputValue !== 0) {
      const result = Math.pow(inputValue, 2);
      displayTop.innerText = `${inputValue} * ${inputValue}`;
      displayBottom.innerText = result.toString();
    }
  }

  const toggleSign = () => {
    let inputValue = parseFloat(displayBottom.innerText);
    inputValue = -inputValue;

    if (displayTop.innerText === '0') {
      displayTop.innerText = inputValue.toString();
      displayBottom.innerText = '0';
    }
    else {
      const result = eval(displayTop.innerText + inputValue);
      displayBottom.innerText = result.toString();
      displayTop.innerText = '0';
    }
  }

  const squareRoot = () => {
    const inputValue = parseFloat(displayBottom.innerText);
    if (inputValue !== 0) {
      const result = Math.sqrt(inputValue);
      displayTop.innerText =`${inputValue}`; 
      displayBottom.innerText = result.toString();
    }
  }

  const divide = () => {
    if (displayBottom.innerText === 0) {
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

  //Creamos el historial
  const createHistorial = () => {
    const createSave = document.createElement("li");
    createSave.classList.add("historial-calculator");
    createSave.innerHTML = `
      <span> ${saveHistorial}</span>
    `;
    historialContent.appendChild(createSave);
  }
  const deleteHistorialAll = () => {
    historialContent.innerHTML = '';
  };


  //Recorre cada número
  numbers.forEach(n => {
    n.addEventListener('click', numberInput);
  });

  //Recorre cada operador
  operators.forEach(o => {
    o.addEventListener('click', operatorInput);
  });

  deleteAllButton.addEventListener('click', deleteAll); //Recorre el boton de borrar todo
  deleteOneButton.addEventListener('click', deleteOne); //Recorre el boton de borrar uno
  equal.addEventListener('click', equals); //Recorre el igual
  deleteHistorial.addEventListener('click', deleteHistorialAll);

  historialContent.addEventListener('click', () => {  //Crea el historial
    const newHistorial = equal.value;
    if (newHistorial !== "") {
      createHistorial(newHistorial);
      equal.value = '';
    }
  });


});

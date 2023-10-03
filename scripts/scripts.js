//Para que funcione, necesita que carge todo el archivo HTML y CSS
document.addEventListener("DOMContentLoaded", () => {

  const displayTop = document.getElementById('save-operation');
  const displayBottom = document.getElementById('first-valor');
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

  //Muestra (incluyendo PI) cada boton numerico
  const numberInput = (e) => {
    if (e.target.value === '.' && !displayBottom.innerText.includes(e.target.value)) {
      displayBottom.innerText += e.target.value;
    }
    let number = parseFloat(e.target.value);
    if (e.target.id === "pi") {
      number = Math.PI.toFixed(5);
    }
    if (number || number == 0) {

      if (displayBottom.innerHTML.length <= 5) {

        if (displayBottom.innerText === '0') {
          displayBottom.innerText = number;
        }
        else {
          displayBottom.innerText += number;
        }

      }

    }
  }

  const percentage = (num1, num2) =>{
    return (num1*100)/num2;
  }

  const fraction = (num1) =>{
    return 1/num1;
  }

  const square = (num1) =>{
    return Math.pow(num1,2);
  }

  const squareRoot = (num1) =>{
    return Math.sqrt(num1);
  }

  const divide = (num1,num2) =>{
    if (num2 === 0){
      return 'ERROR';
    }
    else{
      return num1/num2;
    }
  }

  const multiply = (num1,num2) =>{
    return num1*num2;
  }

  const subtract = (num1,num2) =>{
    return num1-num2;
  }

  const add = (num1,num2) =>{
    return num1+num2;
  }

  const toggleSign = (num1) =>{
    return num1*-1;
  }


  //Recorre cada input
  numbers.forEach(n => {
    n.addEventListener('click', numberInput);
  });
})

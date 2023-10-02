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
    document.getElementById(","),
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
    let number = parseFloat(e.target.value);
    if (e.target.id === "pi") {
      number = Math.PI.toFixed(8);
    }
    displayBottom.innerText = number;
  }
  //Recorre cada input
  numbers.forEach(n => {
    n.addEventListener('click', numberInput);
  });
})

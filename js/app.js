


import  valida  from "./validaciones.js";
//agarro cualquier input, yodos por el ALL y de ahi le va a agregar el evento blur
// al salirse

//cuando salfa de foco, mandar a llamar a la funcion valida que esta en el otro archivo

const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("blur", (input) => {
    valida(input.target);
  });
});

// const inputNacimiento =document.querySelector("birth");

// inputNacimiento.addEventListener("blur", (evento) => {
//     validarNacimiento(evento.target);
// });


//esta funcion recibe el input y va a veriricar el tipo de input atraves de data set
const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("blur", (input) => {
    valida(input.target);
  });
});


function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
    }
    //console.log(input.parentElement); //para que se seleecione el input pero el padre el div
    if(input.validity.valid){ //aqui es para que me diga sobre unos comfoguraciones del navegaodr
       input.parentElement.classList.remove("input-container--invalid")
       input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
      input.parentElement.classList.add("input-container--invalid")
      input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput,input)
    }
  }

  const tipoDeErrores=[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
  ]
  
  const mensajesDeError ={
    nombre:{
      valueMissing:"El campo nombre no puede estar vacio"
    },
    email:{
      valueMissing:"El campo correo no puede estar vacio", 
      typeMismatch:"El correo no es valido"
    },
    password: {
      valueMissing:"El campo contraseña no puede estar vacio",
      patternMisMatch :
      "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento:{
      valueMissing:"Este campo no puede estar vacio",
      customError:"Debes tener al menos 18 años de edad"
    },
    numero:{
      valueMissing:"Este campo no puede estar vacio",
      patternMisMatch: "El formato requerido es XXXXXXXXX 10 Números"
    },
    direccion:{
      valueMissing:"Este campo no puede estar vacio",
      patternMisMatch: "la direccion debe ser entre 10 a 40 caracteres"
    },
    ciudad:{
      valueMissing:"Este campo no puede estar vacio",
      patternMisMatch: "la ciudad debe ser entre 10 a 40 caracteres"
    },
    estado:{
      valueMissing:"Este campo no puede estar vacio",
      patternMisMatch: "el estado debe ser entre 10 a 40 caracteres"
    }
  }

//aqui vamos a ir armando un objto con los diferentes input que vamos a tener esto por data del input del html 
const validadores = {
    nacimiento: (input) => validarNacimiento(input),
  };
  


 function mostrarMensajeDeError(tipoDeInput, input){
  let mensaje = ""
  tipoDeErrores.forEach(error =>{
    if(input.validity[error]){
    console.log(tipoDeInput, error)
      console.log(input.validity[error])
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje=mensajesDeError[tipoDeInput][error]
    }
  });

  return mensaje
 }

  function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
      mensaje = "Debes tener al menos 18 años de edad";
    }
  //el mensaje de title en foront end solo que ahora en backend
    input.setCustomValidity(mensaje);
  }
   
 

  
// valida la fecha que recibo, para ver si es mayor de edad o no la fecha es la fecha cliente?
function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
      fecha.getUTCFullYear() + 18,
      fecha.getUTCMonth(),
      fecha.getUTCDate()
    );
    //console.log(fecha,"-----",  fechaActual);
//console.log(diferenciaFechas)
    return diferenciaFechas <= fechaActual;
  }
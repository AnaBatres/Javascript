class Alumno {
  constructor(nombre, candidato) {
    this.nombre = nombre;
    this.candidato = candidato;
  }

  getCandidato() {
    return this.candidato;
  }

  setCandidato(candidato) {
    this.candidato = candidato;
  }

  setVotos() {
    this.votos++;
  }

  getVotos() {
    return this.votos;
  }
}

const alumnos = [];

function comenzar() {
  var archivos = document.getElementById("archivos");
  archivos.addEventListener("change", procesar, false);
}

function procesar(e) {
  var archivos = e.target.files;
  var mi_archivo = archivos[0];
  var lector = new FileReader();

  lector.onload = function (e) {
    var resultado = e.target.result;
    var lineas = resultado.split('\n');

    lineas.forEach((linea) => {
      const nombre = linea.trim();
      if (nombre !== "") {
        const alumno = new Alumno(nombre, false);
        alumnos.push(alumno);
      }
    });

    visualizarDatos();
    cargarSelect();

    document.getElementById("zonaformulario").setAttribute("style", "visibility:hidden");
    document.getElementById("selectCandidatos").setAttribute("style", "visibility: visible");
  };

  lector.readAsText(mi_archivo);
}


function visualizarDatos() {
  const zonadatos = document.getElementById("zonadatos");
  zonadatos.innerHTML = "";

  alumnos.forEach((alumno) => {
    const elemento = document.createElement("p");
    elemento.textContent = alumno.nombre;
    zonadatos.appendChild(elemento);
  });
}

function cargarSelect() {
  var select = document.getElementById("candidatos");
  select.innerHTML = '';

  alumnos.forEach((alumno) => {
    if (alumno.nombre !== "") {
      const option = document.createElement("option");
      option.value = alumno.nombre;
      option.text = alumno.nombre;
      select.appendChild(option);
    }
  });
}

function votarCandidatos() {
  var select = document.getElementById("candidatos");
  var selectedOptions = select.selectedOptions;

  for (let i = 0; i < selectedOptions.length; i++) {
    var candidatoText = selectedOptions[i].text;

    for (let j = 0; j < alumnos.length; j++) {
      const alumno = alumnos[j];
      if (alumno.nombre === candidatoText) {
        alumno.setCandidato(true);
        alumno.votos = 0;
      }
    }
  }
  imprimirCandidatos();
}

function imprimirCandidatos() {
  const zonadatos = document.getElementById("zonadatos");
  zonadatos.innerHTML = "";

  const h3 = document.createElement("h3");
  h3.textContent = "Candidatos a ser delegado";
  zonadatos.appendChild(h3);

  alumnos.forEach((alumno) => {
    if (alumno.getCandidato() === true) {
      const p = document.createElement("p");
      p.textContent = alumno.nombre;
      zonadatos.appendChild(p);
    }
  });
  const boton = document.createElement("button");
  boton.onclick = votarDelegado;
  boton.textContent = "Comenzar votación";
  zonadatos.appendChild(boton);
}

function votarDelegado() {
  for (let i = 0; i < alumnos.length; i++) {
    const alumnoVotado = prompt("\nVoto de: " + alumnos[i].nombre);
    votar(alumnoVotado);
  }
  mostrarVotos();
} 

function votar(alumnoVotado) {
  for (let i = 0; i < alumnos.length; i++) {
    const alumno = alumnos[i];
    if (alumno.getCandidato() === true) {
      if (alumno.nombre === alumnoVotado) {
        alumno.setVotos();
      }
    }
  }
}

function mostrarVotos() {
  var zonadatos = document.getElementById("zonadatos");
  zonadatos.innerHTML = '';

  var resultados = "";
  for (let i = 0; i < alumnos.length; i++) {
    if (alumnos[i].getCandidato() === true) {
      var porcentaje = ((alumnos[i].getVotos() / alumnos.length) * 100).toFixed(2);
      resultados += "Votos de " + alumnos[i].nombre + ": " + alumnos[i].getVotos() 
      + "<br>Porcentaje: " + porcentaje + "%<br><br>";
    }
  }
  const h3 = document.createElement("h3");
  h3.textContent = "Resultado de las votaciones: ";
  zonadatos.appendChild(h3);

  zonadatos.innerHTML += resultados;
}

document.addEventListener("DOMContentLoaded", comenzar);


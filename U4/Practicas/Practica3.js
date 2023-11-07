var alumnos = new Array();
var candidatos = new Array();
var votos = new Array();
var indice = 0;

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
        alumnos = resultado.split('\n');
        cargarSelect();
        visualizarDatos();
    };

    lector.readAsText(mi_archivo);
    document.querySelector("#selectCandidatos").setAttribute("style", "visibility:visible");
}

function visualizarDatos() {
    var zonadatos = document.getElementById("zonadatos");
    var contenido = "";

    for (var i = 0; i < alumnos.length; i++) {
        contenido += alumnos[i] + "<br>";
    }

    zonadatos.innerHTML = contenido;
}

function cargarSelect() {
    var select = document.getElementById("candidatos");
    select.innerHTML = '';

    for (var i = 0; i < alumnos.length; i++) {
        var linea = alumnos[i].trim();
        if (linea !== '') {
            var option = document.createElement("option");
            option.value = i;
            option.text = linea;
            select.appendChild(option);
        }
    }
}

function votarCandidatos() {
    var h3 = document.getElementById("h3");
    h3.textContent = "Candidatos a ser delegado";
    var select = document.getElementById("candidatos");
    var selectedOptions = select.selectedOptions;

    for (var i = 0; i < selectedOptions.length; i++) {
        var candidatoText = selectedOptions[i].text; 

        candidatos.push(candidatoText);
        votos.push(0); 
    }

    var textoCandidatos = document.getElementById("textoCandidatos");
    textoCandidatos.innerHTML = candidatos.join("<br>");
    document.querySelector("#votar").setAttribute("style", "visibility:visible");
}

function votarDelegado() {
    for (element of alumnos) {
        alumnoVotado = prompt("Candidatos:\n" + candidatos.join("\n") + "\nVoto de: " + element);
        votar(alumnoVotado);
    }
    mostrarVotos();
}

function votar(alumnoVotado) {
    for (let i = 0; i < candidatos.length; i++) {
        if (alumnoVotado == candidatos[i]) {
            votos[i] = votos[i] + 1;
        }
    }
}

function mostrarVotos() {
    var h3 = document.getElementById("resultadosEncabezado");
    h3.textContent = "Resultado de las votaciones: ";
    var resultados = "";
    for (let i = 0; i < candidatos.length; i++) {
        var porcentaje = (votos[i] / alumnos.length * 100).toFixed(2);
        resultados += "Votos de " + candidatos[i] + ": " + votos[i] + 
        "<br> Porcentaje:" + porcentaje + "<br><br>";
    }
    var elemento = document.getElementById("resultados");
    elemento.innerHTML = resultados;
}

document.addEventListener("DOMContentLoaded", comenzar);



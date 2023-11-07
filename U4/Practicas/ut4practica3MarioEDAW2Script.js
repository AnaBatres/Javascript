
var datos = new Array();
function comenzar(){
    var zonadatos=document.getElementById("zonadatos");
    var archivos=document.getElementById("archivos");
    archivos.addEventListener("change", procesar, false);
}

function procesar(e)
{
    var archivos = e.target.files;
    var mi_archivo= archivos[0];
    var lector = new FileReader();
    lector.readAsText(mi_archivo);
    lector.addEventListener("load", mostrar_en_web, false);
}

function mostrar_en_web(e)
{
    var resultado= e.target.result;
    lineas=resultado.split('\n');
    crearArrayAlumnos();
    optionAlumnos();
}

function crearArrayAlumnos(){
    alumnos=[];
    candidatos=[];
    votos=[];
    for (element of lineas) {
        alumnos.push(element);
    }
}

function optionAlumnos(){
    let select = document.getElementById("selectorAlumnos");
    
    for (element of alumnos) {
        let el = document.createElement("option");
        el.textContent = element;
        el.value = element;
        select.appendChild(el);
    }
}


function getCandidatos() {
    selectElement = document.querySelector('#selectorAlumnos');
    alumnoSeleccionado = selectElement.value;
    candidatos.push(alumnoSeleccionado);
}

function finalizarSeleccion()
{
    const pCandidato = document.createElement("p");
    for (element of candidatos) {
            const tCandidato = document.createTextNode(element);
            pCandidato.appendChild(tCandidato);
            const divCandidato = document.getElementById("candidatos");
            divCandidato.appendChild(pCandidato);
    }
    rellenarArrayVotos();
}

function rellenarArrayVotos() {
    for (element of candidatos)
    {
        votos.push(0);
    }
}

function votar(alumnoVotado)
{
    for (let i = 0; i < candidatos.length; i++) {
	
        if (alumnoVotado==candidatos[i]) {
		
           votos[i]=votos[i]+1;
        }
    }
}

function comenzarVotacion(){
    
    for (element of alumnos) {
        alumnoVotado = prompt("Introduce el alumno al que quieres votar:"+element);
        votar(alumnoVotado);
    }
    mostrarVotos();

}

function mostrarVotos(){
    const pVotos = document.createElement("p");
   
    for (let i = 0; i < votos.length; i++) {
	 porcentaje=votos[i]/alumnos.length*100;
	 const tVotos = document.createTextNode(candidatos[i]+" votos: "+votos[i]+ " porcentaje: "+porcentaje+"   ");
         pVotos.appendChild(tVotos);
         const divVotos = document.getElementById("div2");
         divVotos.appendChild(pVotos);
 
    }
}

window.addEventListener("load", comenzar, false);
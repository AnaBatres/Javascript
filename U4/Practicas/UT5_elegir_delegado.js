var alumnos_candidatos = new Array();
var votos_candidatos = new Array();
var alumnos_clase = new Array();
var indice = 0;
 

function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.readAsText(archivo,"iso 8859-1");
    lector.onload = function(e) {
        var contenido_fichero = e.target.result;
        var contenido = String(contenido_fichero);
        mostrarContenido(contenido);
        var lineas = contenido.split('\n')
        for (i=0;i<lineas.length;i++) {
            document.getElementById("datos").options[i] = new Option(lineas[i]);
            alumnos_clase[i] = lineas[i];
        }
    };
    
    var procesar = document.getElementById('boton_candidatos'); 
    procesar.style.display="block"; //esconde el boton 
}

function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = contenido;
}

function limpiarDesplegable(){
    var datos = document.getElementById("datos");
    while (datos.options.length > 0) {
        datos.remove(0);
    }
    datos.multiple = false;

}
function mostrarCandidatos(array_candidatos){
    for (i=0;i<array_candidatos.length;i++)
    document.getElementById("datos").options[i] = new Option(array_candidatos[i]);

}
function votar_candidato(){
    if (indice < alumnos_clase.length ) {
        var identificador_candidato = document.getElementById("datos").options.selectedIndex;
        votos_candidatos[identificador_candidato] ++ ;
    //    alert(`Se ha votado a: ${alumnos_candidatos[identificador_candidato]} que lleva ${votos_candidatos[identificador_candidato]}`);
        document.getElementById('parrafo_alumno').innerHTML = alumnos_clase [indice] + "va a votar:";
        indice++;
    } else {
        //document.getElementById('boton_candidatos').setAttribute("display", "none");
        var procesar = document.getElementById('boton_candidatos'); 
        procesar.style.display="none";  //visualizalo

        presentar_resultados(); 
    }
}

function presentar_resultados(){
    var resultados = "";
    for (let index = 0; index < alumnos_candidatos.length; index++) {
        const resultado = alumnos_candidatos[index] + " ha obtenido: " + votos_candidatos[index] + " votos\n" ;
        resultados = resultados + resultado;
    }
    mostrarContenido(resultados);
}

function construir_array_candidatos(){
  var candidatos =  document.getElementById('datos');
  alumnos_candidatos = Array.from(candidatos.selectedOptions).map(option => option.value);
  var votos = new Array(alumnos_candidatos.length);
  votos_candidatos = votos.fill(0); //inicializar a 0 los indices
  
  //var elemento = document.getElementById('alumnos_candidatos');
  //elemento.innerHTML = alumnos_candidatos.join('\n');
  
  document.getElementById('cabecera').innerHTML = "Alumnos Candidatos";
  mostrarContenido(alumnos_candidatos.join('\n')); //crea ps

  limpiarDesplegable();
  mostrarCandidatos(alumnos_candidatos);

  document.getElementById('texto_boton').innerHTML = "Votar";
  document.getElementById('boton_candidatos').setAttribute('onClick', "javascript: votar_candidato();"); //cambiar atributo de onclick

  document.getElementById('parrafo_alumno').innerHTML = alumnos_clase [indice] + "va a votar:";
  // document.getElementById('boton_candidatos').addEventListener('click', votar_candidato(), false);

}

function iniciar () {
    document.getElementById('file-input').addEventListener('change', leerArchivo, false); 
    document.getElementById('cabecera').innerHTML = "Contenido del archivo";
}


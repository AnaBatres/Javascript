window.addEventListener("load", iniciar, false);

var tipo_ingreso ;
var tipo_gasto ;
let arrayGastos = new Array();
let arrayIngreso_gasto = new Array();
var claves = new Array();
var consultar;
var contenido;
    
class Gasto {
    constructor(id,ingreso_gasto,valor,descripcion,fecha,idConcepto) {
        this.id=id;
        this.ingreso_gasto=ingreso_gasto;
        this.valor=valor;
        this.descripcion=descripcion;
        this.fecha=fecha;
        this.idConcepto=idConcepto;
    }
}

function eleminarElementos(id){
    var elemento = document.getElementById(id);
    while (elemento.hasChildNodes()){
        elemento.removeChild(elemento.firstChild);
    }
}

function presentarDatos(){

    var tituloTabla = document.getElementById("tituloTabla");
    tituloTabla.style.visibility="visible";

    if ( tipo_gasto.checked ){
        valorElegido=tipo_gasto.value;
        console.log("Seleccionado Gasto");
    } else {
        console.log("No Gasto");
        valorElegido=""; 
    }
    if ( tipo_ingreso.checked ){
        valorElegido2=tipo_ingreso.value;
        console.log("Seleccionado Ingreso");
    } else {
        valorElegido2="";
        console.log("No Ingreso");
    }
    console.log(valorElegido);
    console.log(valorElegido2);
    
    
    //Obtenermos descripciones para la cabecara. 
    let propiedadGasto = Object.keys(arrayGastos[0]); 
    //propiedadGasto = claves;
    
    //Borramos elementos de tabla creados anteriormente si los hubiera
    eleminarElementos("contenido");

    //Creamos elementos de tabla
    let tabla = document.createElement("table");
    let cabeceraTabla = document.createElement("thead");
    let cabeceraTR = document.createElement("tr");
    
    
    for ( var i=0; i < propiedadGasto.length; i++ ){
        let cabeceraTH = document.createElement("th");
        cabeceraTH.textContent = propiedadGasto[i].toUpperCase();
        cabeceraTR.appendChild(cabeceraTH);
    }
    cabeceraTabla.appendChild(cabeceraTR);
    tabla.appendChild(cabeceraTabla);    

    let bodyTabla = document.createElement("tbody");
    
    for ( var i=0; i < arrayGastos.length; i++ ){
        if ( arrayGastos[i].ingreso_gasto == valorElegido || arrayGastos[i].ingreso_gasto == valorElegido2){
            let bodyTR = document.createElement("tr");
            for ( var j=0; j < propiedadGasto.length; j++  ) {
                let bodyTD = document.createElement("td");
                bodyTD.textContent = arrayGastos[i][propiedadGasto[j]];
                bodyTR.appendChild(bodyTD);
            }
            bodyTabla.appendChild(bodyTR);
        }   
    }
    tabla.appendChild(bodyTabla);    

    let contenido = document.getElementById("contenido");
    contenido.appendChild(tabla);    
}

function almacenarDatos(respuesta){

    let datos = JSON.parse(respuesta);
    console.log(datos);
    claves = Object.keys(datos[0]);
    console.log(claves);

    datos.forEach(elemento => {
        var gasto = new Gasto(  elemento.Id,
                                    elemento.Ingreso_gasto,
                                    elemento.Valor,
                                    elemento.Descripcion,
                                    elemento.Fecha,
                                    elemento.Id_concepto
                                )
        arrayGastos.push(gasto);
        if (!arrayIngreso_gasto.includes(elemento.Ingreso_gasto)) {
            arrayIngreso_gasto.push(elemento.Ingreso_gasto);
        }        
    });
    console.log(arrayGastos);
    console.log(arrayIngreso_gasto);
    tipo_gasto = document.getElementById("tipo_gasto");
    tipo_ingreso = document.getElementById("tipo_ingreso");
    
    tipo_ingreso.addEventListener("change", presentarDatos, false);
    tipo_gasto.addEventListener("change", presentarDatos, false);

}


function cargarDatos() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            almacenarDatos(xhr.responseText);
            consultar.disabled = "true";
        }
    };
    xhr.open("GET", "GastosObtenerTodos.php", true);
    xhr.send();
}

function iniciar() {
    consultar = document.getElementById("Consultar");
    consultar.addEventListener("click", cargarDatos, false);
    contenido=document.getElementById("contenido");
}





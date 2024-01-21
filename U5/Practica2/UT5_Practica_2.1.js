// Crea un formulario HTML con dos elementos: uno select y otro datalist con los mismos datos.
// A continuación, mediante código javascript, visualiza el contenido de los datos elegidos de cada elemento, comentando 
// las diferencias que encuentres a la hora de referenciarlos (obtener sus valores).

var opcionSelect;
var opcionDatalist;

function recogerDatos() {
    var select = document.getElementById("select");
    var datalist = document.getElementById("datalist");

    opcionSelect = select.value;
    opcionDatalist = datalist.value;
}

function mostrarDatos() {
    var zonadatos = document.getElementById("zonadatos");
    zonadatos.innerHTML="";
    recogerDatos();

    var pS = document.createElement("p");
    var pD = document.createElement("p");
    pS.textContent = "Opcion Select --> " + opcionSelect;
    pD.textContent = "Opcion Datalist --> " + opcionDatalist;
    zonadatos.appendChild(pS);
    zonadatos.appendChild(pD);
}




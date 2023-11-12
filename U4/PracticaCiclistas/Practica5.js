// Se deberá realizar los siguientes puntos:

// Crear la/s estructura/s de datos que permita el almacenamiento dinámico de los datos del fichero, y 
// de los datos calculados sobre los mismos (VO2MAX: La fórmula está en el fichero html)

// Cargar el fichero en la/s estructura/s de datos creada/s anteriormente. 
// El formato del fichero de información es el siguiente (cada línea):

// Ciclista | peso | Potencia (5min)

// Volcar los datos en los elementos html de la propia página web.

// A través de la pulsación del botón “siguiente”: por cada pulsación se presentará el siguiente registro leído / calculado de la estructura de datos.

// (Opcional) botón “anterior” para cargar los datos del ciclista anterior.


class Ciclista {
    constructor(nombre, peso, potencia) {
        this.nombre = nombre;
        this.peso = peso;
        this.potencia = potencia;
        this.V02MAX = this.V02MAX;
    }

    calcularV02MAX(potencia, peso) {
         this.V02MAX = (10.8 * potencia / peso) + 7;
    }
}

var ciclistas = [];
i = 0;

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
            const ciclistaPropiedades = linea.split('|');
            if (ciclistaPropiedades !== "") {
                const ciclista = new Ciclista(ciclistaPropiedades[0].trim(), ciclistaPropiedades[1].trim(), ciclistaPropiedades[2].trim());
                ciclistas.push(ciclista);
            }
        });
        console.log(ciclistas);

        visualizarDatos();

    };

    lector.readAsText(mi_archivo);
}

function visualizarDatos() {
    var titulo= document.getElementById("zonaformulario");
    titulo.innerHTML="";

    

    ciclistas[i].calcularV02MAX(ciclistas[i].potencia, ciclistas[i].peso)

    document.getElementById("nombre").value = ciclistas[i].nombre;
    document.getElementById("peso").value = ciclistas[i].peso;
    document.getElementById("potencia").value = ciclistas[i].potencia;
    document.getElementById("VO2MAX").value = ciclistas[i].V02MAX.toFixed(2);

    console.log(ciclistas[i].V02MAX);

    var h3 = document.createElement("h3");
    h3.textContent="Datos del ciclista: " + ciclistas[i].nombre;
    titulo.appendChild(h3);
}

function siguienteCiclista(){
    if(i < ciclistas.length -1){
        i = i +1;
    visualizarDatos();
    }
}

function anteriorCiclista(){
    if(i > 0){
        i = i - 1;
    visualizarDatos();
    }
}

document.addEventListener("DOMContentLoaded", comenzar);

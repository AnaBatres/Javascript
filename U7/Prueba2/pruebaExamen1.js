class Movimiento {
    constructor(claves, valores) {
        this.datos = {};

        // Asegurarse de que las claves y los valores tengan la misma longitud
        if (claves.length === valores.length) {
            for (let i = 0; i < claves.length; i++) {
                this.datos[claves[i]] = valores[i];
            }
        } else {
            console.error("Error: La longitud de las claves no coincide con la longitud de los valores.");
        }
    }
}

window.onload = start;

function start() {
    document.getElementById("consultar").addEventListener("click", cargarInformacion);
}

function cargarInformacion() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            crearJson(this);
        }
    }
    xhttp.open("GET", "GastosObtenerTodos.php", true);
    xhttp.send();
    let boton = document.getElementById('consultar');
    boton.disabled = true;
};

// Recoge la petición xhttp y genera un JSON con los datos obtenidos de PHP.
function crearJson(xhttp) {
    const datos = JSON.parse(xhttp.responseText);
    console.log(datos);
    
    obtenerCabeceras(datos)
}

function obtenerCabeceras(arrayJson) {
    let claves = Object.keys(arrayJson[0]);
    console.log(claves);
   
    crearObjeto(claves, arrayJson);
}

function crearObjeto(claves, arrayJson) {
    let arrayDeObjetos = [];

    for (let i = 0; i < arrayJson.length; i++) {
        let valores = Object.values(arrayJson[i]);
        let nuevoObjeto = new Movimiento(claves, valores);
        arrayDeObjetos.push(nuevoObjeto);
    }
    crearListaDatos(arrayDeObjetos)
    console.log(arrayDeObjetos)
    return arrayDeObjetos;
}



function crearListaDatos(arrayDeObjetos) {
    const datalist = document.createElement('datalist');
    datalist.id = 'lista';
    
    for (let i = 0; i < arrayDeObjetos.length; i++) {
        const option = document.createElement('option');
        option.value = arrayDeObjetos[i].datos.Id;
        option.textContent = arrayDeObjetos[i].datos.Id;
        datalist.appendChild(option);
    }

    const input = document.createElement("input");
    input.setAttribute("list", "lista");    
    input.placeholder = 'Elija una opción'; // Cambié el texto del placeholder a un valor genérico
    input.id = 'miInput'; // Agregué un ID al input para referencia posterior
    const contenedor = document.getElementById('contenedor');
    contenedor.appendChild(input);
    contenedor.appendChild(datalist);
    input.addEventListener('change', function() {
        const idSeleccionado = input.value;
        // Llama a tu función aquí con el idSeleccionado
        mostrarMovimiento(idSeleccionado, arrayDeObjetos);
    });
    
}

function mostrarMovimiento(idSeleccionado, arrayDeObjetos) {

    let inputSeleccionado = document.getElementById('miInput');
    inputSeleccionado.value = ''; // Vaciamos el contenido de la caja de texto

    const objetoSeleccionado = encontrarObjetoPorId(arrayDeObjetos, idSeleccionado);

    if (objetoSeleccionado) {
        let formularioDiv = document.getElementById('formulario');

        if (!formularioDiv) {
            formularioDiv = document.createElement('div');
            formularioDiv.id = 'formulario';
            document.getElementById('contenedor').appendChild(formularioDiv);
        }

        formularioDiv.innerHTML = '<h2>Información del Objeto</h2>';

        for (const clave in objetoSeleccionado.datos) {
            const label = document.createElement('label');
            label.textContent = clave + ": ";

            const input = document.createElement('input');
            input.type = 'text';
            input.value = objetoSeleccionado.datos[clave];
            input.readOnly = true; // Hacer los campos de solo lectura

            formularioDiv.appendChild(label);
            formularioDiv.appendChild(input);
            formularioDiv.appendChild(document.createElement('br'));
        }
    }
}
function encontrarObjetoPorId(arrayDeObjetos, id) {
    return arrayDeObjetos.find(objeto => objeto.datos.Id == id);
}

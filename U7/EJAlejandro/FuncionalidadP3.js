window.onload = start;

function start() {
    document.getElementById("consultar").addEventListener("click", cargarInformacion);
}

function cargarInformacion() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("ingreso").addEventListener("change", function () {
                actualizarTabla();
            });
            document.getElementById("gasto").addEventListener("change", function () {
                actualizarTabla();
            });
            crearJson(this);
        }
    };

    xhttp.open("GET", "GastosObtenerTodos.php", true);
    xhttp.send();
    let boton = document.getElementById('consultar');
    boton.disabled = true;
    let checkbox = document.querySelectorAll('input[type="checkbox"]')[0];
    let checkbox2 = document.querySelectorAll('input[type="checkbox"]')[1];
    checkbox.disabled = false;
    checkbox2.disabled = false;
}

// recoge la petición xhttp y  genera un json con los datos obtenidos de php. 

function crearJson(xhttp) {
    const datos = JSON.parse(xhttp.responseText);
    console.log(datos);
    obtenerClaves(datos);
}

// Recoge el json creado obtiene solo las claves 
function obtenerClaves(datosJson) {
    let claves = Object.keys(datosJson[0]);
    console.log(claves);
    crearTablaOculta(claves, datosJson);
}


function crearTablaOculta(claves, datosJson) {

    let tabla = document.createElement('table');
    tabla.id = 'tablaDatos';
    let cabecera = tabla.createTHead().insertRow();

    //Este bloque crea la cabecera
    for (let i in claves) {
        let celda = document.createElement('th');
        celda.textContent = claves[i];
        cabecera.appendChild(celda);
    }
   
    //Aqui se crea el cuerpo de la tabla 

    let cuerpoTabla = tabla.createTBody();

    for (let j = 0; j < datosJson.length; j++) {
        let fila = cuerpoTabla.insertRow();

        for (let k = 0; k < claves.length; k++) {
            let celda = fila.insertCell();
            celda.textContent = datosJson[j][claves[k]];
        }
    }

    document.body.appendChild(tabla);

    //Se oculta la tabla 
    tabla.style.display = "none";
    tabla.style.border = "1px solid";
}

function actualizarTabla() {
    let tabla = document.getElementById("tablaDatos");
    let checkbox = document.querySelectorAll('input[type="checkbox"]')[0];
    let checkbox2 = document.querySelectorAll('input[type="checkbox"]')[1];

    // recojo en un array todos las filas (tr)
    let filas = document.getElementsByTagName('tr');

    //empiezo en uno  para no coger  la cabecera
    // se hubiese hecho mucho mas fácil si hubiese puesto filas[1] si conociese 
    //la posición 
    for (let i = 1; i < filas.length; i++) {
        filas[i].style.display = 'none';

        let celdas = filas[i].getElementsByTagName('td');

        //variables booleanas de control 
        let esIngreso = celdas[1].textContent === "Ingreso";
        let esGasto = celdas[1].textContent === "Gasto";

        // Mostrar u ocultar la fila según las condiciones, si está marcado y coincide con la palabra 
        //  muestra, sino se mantiene oculto

        if ((checkbox.checked && esIngreso) || (checkbox2.checked && esGasto)) {
            filas[i].style.display = "";
        }

    }

    // ultima verificación para que si no están ninguno seleccionado, no se muestre la tabla
    
    if (!checkbox.checked && !checkbox2.checked) {
        tabla.style.display = 'none';
    } else {
        tabla.style.display = '';
    }

    document.body.appendChild(tabla);

}



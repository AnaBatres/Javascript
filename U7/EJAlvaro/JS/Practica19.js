class Movimiento{
    constructor(id, ingreso_gasto, valor, descripcion, fecha, id_concepto){
        this.id = id;
        this.ingreso_gasto = ingreso_gasto;
        this.valor = valor;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.id_concepto = id_concepto;
    }
}

const movimientos = [];
const cabeceras = [];

let inputGastos;
let inputIngresos;
let divTabla;

function recopilacionMovimientos() {
    const peticion = new XMLHttpRequest();
    const url = "../PHP/GastosObtenerTodos.php"

    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status == 200) {
            const arrayDatos = JSON.parse(peticion.responseText);
            cargaJsonMovimientos(arrayDatos);
        }
    };
    peticion.open("GET", url);
    peticion.send();
}

// function recopilacionMovimientos() {
//     const url = "../PHP/GastosObtenerTodos.php"
//     fetch(url)
//         .then(response => response.json())
//         .then(data => cargaJsonMovimientos(data))
//         .catch(error => console.error('Error fetching data:', error));
// }

function cargaJsonMovimientos(arrayDatos) {
    if (arrayDatos.length > 0) {
        crearCabeceras(Object.keys(arrayDatos[0]));
        aniadirMovimientos(arrayDatos);
    }
}

function crearCabeceras(arrayCabeceras){
    cabeceras.push(...arrayCabeceras.filter(cabecera => cabecera !== 'Id' && cabecera !== 'Id_concepto'));
    console.log(cabeceras);
}

function aniadirMovimientos(arrayDatos){
    movimientos.push(...arrayDatos.map(dato => new Movimiento(
        dato.Id,
        dato.Ingreso_gasto,
        dato.Valor,
        dato.Descripcion,
        dato.Fecha,
        dato.Id_concepto
    )));
}

function mostrarTabla() {
    const tabla = document.createElement("table");

    const filtrarIngresos = inputIngresos.checked;
    const filtrarGastos = inputGastos.checked;

    const movimientosFiltrados = movimientos.filter(movimiento => {
        const esIngreso = movimiento.ingreso_gasto === "Ingreso";
        const esGasto = movimiento.ingreso_gasto === "Gasto";
        return (filtrarIngresos && esIngreso) || (filtrarGastos && esGasto) || (filtrarIngresos && filtrarGastos);
    });

    if (movimientosFiltrados.length === 0) {
        divTabla.innerHTML="";
        divTabla.style.display = "none";
        return;
    }

    const encabezado = document.createElement("tr");
    cabeceras.forEach(cabecera => {
        const th = document.createElement("th");
        th.textContent = cabecera;
        encabezado.appendChild(th);
    });
    tabla.appendChild(encabezado);

    movimientosFiltrados.forEach(movimiento => {
        const fila = document.createElement("tr");
        cabeceras.forEach(cabecera => {
            const celda = document.createElement("td");
            const valorPropiedad = movimiento[cabecera.toLowerCase()];
            celda.textContent = valorPropiedad ? valorPropiedad : '-';
            fila.appendChild(celda);
        });
        tabla.appendChild(fila);
    });

    divTabla.innerHTML = ''; // Limpiar el div
    divTabla.appendChild(tabla);
    divTabla.style.display = "block";
}

function inicio() {

    divTabla = document.getElementById("tabla");
    inputIngresos = document.getElementById("ingresos");
    inputGastos = document.getElementById("gastos");
    button = document.getElementsByTagName("button")[0];
    recopilacionMovimientos();

    button.addEventListener("click", mostrarTabla, false);
}

window.addEventListener("load", inicio, false);

let ingreso;
let gasto;

function iniciar() {
    document.getElementsByTagName("button")[0].addEventListener("click", consultar);
    ingreso = document.getElementsByTagName("input")[0];
    gasto = document.getElementsByTagName("input")[1];
    div = document.getElementsByTagName("div")[0];
    tabla = document.createElement("table");

    select = document.createElement("select");
    select.setAttribute("multiple", true);

    select.addEventListener("change", generarTabla)
    ingreso.addEventListener("change", generarDesplegable);
    gasto.addEventListener("change", generarDesplegable);
}

function crearCabecera() {
    cabecera = Object.keys(datos[0]);
    trCabecera = document.createElement("tr");
    cabecera.forEach(elemento => {
        th = document.createElement("th");
        th.textContent = elemento;
        trCabecera.appendChild(th);
    });

    tabla.appendChild(trCabecera);
}

function consultar() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText != "id")
                datos = JSON.parse(this.responseText);
        }
    };
    xhttp.open("GET", "Archivos/GastosObtenerTodos.php", true);
    xhttp.send();

    document.getElementsByTagName("p")[1].hidden = false;
}


function generarDesplegable() {
    select.innerHTML = "";
    tabla.innerHTML = "";
    for (let i = 0; i < datos.length; i++) {
        if ((ingreso.checked && datos[i].Ingreso_gasto === "Ingreso")
            || (gasto.checked && datos[i].Ingreso_gasto === "Gasto")) {
            option = document.createElement("option");
            option.value = datos[i].Id;
            option.textContent = datos[i].Id;
            select.appendChild(option);

        }
    }
    div.appendChild(select);
}

function generarTabla() {
    tabla.innerHTML = "";
    var selectedOptions = select.selectedOptions;
    crearCabecera();

    for (let i = 0; i < selectedOptions.length; i++) {
        IdSeleccionado = parseInt(selectedOptions[i].value);
        console.log(selectedOptions[i].value);
        console.log(typeof selectedOptions[i].value);
        IdDatos = datos.find(item => item.Id === IdSeleccionado);
        console.log(IdDatos);

            let tr = document.createElement("tr");
            cabecera.forEach(elemento => {
                let td = document.createElement("td");
                td.textContent = IdDatos[elemento];
                tr.appendChild(td);
            });
            tabla.appendChild(tr);
    }
    div.appendChild(tabla);
}


window.addEventListener("load", iniciar);

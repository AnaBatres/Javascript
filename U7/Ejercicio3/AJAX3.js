function crearCabecera(){
    cabecera = Object.keys(datos[0]);
    trCabecera = document.createElement("tr");
    cabecera.forEach(elemento => {
        th = document.createElement("th");
        th.textContent = elemento;
        trCabecera.appendChild(th);
    });

    tabla.appendChild(trCabecera);
}

function mostrarDatos() {
    tabla.innerHTML = "";

    if (ingreso.checked || gasto.checked) {
        crearCabecera();
        for (let i = 0; i < datos.length; i++) {
            if ((ingreso.checked && datos[i].Ingreso_gasto === "Ingreso") 
                || (gasto.checked && datos[i].Ingreso_gasto === "Gasto")) {
                tr = document.createElement("tr");
                cabecera.forEach(elemento => {
                    td = document.createElement("td");
                    td.textContent = datos[i][elemento];
                    tr.appendChild(td);
                });
                tabla.appendChild(tr);
            }   
        }
    }
    div.appendChild(tabla);
}

function consultar() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText != "id")
            datos = JSON.parse(this.responseText);
            datos.forEach(objeto => {
                delete objeto.Id;
                delete objeto.Id_concepto;
            });
        }
    };
    xhttp.open("GET", "Archivos/GastosObtenerTodos.php", true);
    xhttp.send();

    document.getElementsByTagName("p")[1].hidden = false;
}

function iniciar() {
    boton = document.getElementsByTagName("button")[0].addEventListener("click", consultar);
    ingreso = document.getElementsByTagName("input")[0];
    gasto = document.getElementsByTagName("input")[1];
    div = document.getElementsByTagName("div")[0];
    tabla = document.createElement("table");

    ingreso.addEventListener("change", mostrarDatos);
    gasto.addEventListener("change", mostrarDatos);
}

window.addEventListener("load", iniciar);

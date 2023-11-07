var productos = [];

function inicio() {
    var archivos = document.getElementById("archivos");
    archivos.addEventListener("change", lectura, false);

    var select = document.getElementById("productos");
    select.addEventListener("change", mostrarPrecio, false);
}

function lectura(e) {
    var archivos = e.target.files;
    var archivo = archivos[0];
    var lector = new FileReader();
    
    lector.onload = function (e) {
        var resultado = e.target.result;
        productos = resultado.split('\n'); 
        cargarSelect();
    };

    lector.readAsText(archivo);
}

function cargarSelect() {
    var select = document.getElementById("productos");
    select.innerHTML = ''; 
    for (var i = 0; i < productos.length; i++) {
        var linea = productos[i].trim(); 
        if (linea !== '') {
            var partes = linea.split(';');
            var producto = partes[0];
            var precio = partes[1];
   
            var option = document.createElement("option");
            option.value = precio;
            option.text = producto;
            select.appendChild(option);
        }
    }
}

function mostrarPrecio() {
    var select = document.getElementById("productos");
    var selectedOption = select.options[select.selectedIndex];
    var precio = selectedOption.value;

    var precioElement = document.getElementById("precio");
    precioElement.textContent = "Precio: " + precio;
}

document.addEventListener("DOMContentLoaded", inicio);

class Empleado {
    constructor(nombre, edad, cargo, salario) {
        this.nombre = nombre;
        this.edad = edad;
        this.cargo = cargo;
        this.salario = salario;
    }
}

var empleados = [];

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
            const empleadosPropiedades = linea.split(',');
            console.log(empleadosPropiedades);
            if (empleadosPropiedades !== "") {
                const empleado = new Empleado(empleadosPropiedades[0].trim(), empleadosPropiedades[1].trim(),
                    empleadosPropiedades[2].trim(), empleadosPropiedades[3].trim());
                empleados.push(empleado);
                console.log(empleado);
            }
        });
        visualizarDatos();
    };

    lector.readAsText(mi_archivo);
}

function visualizarDatos() {
    var zonadatos = document.getElementById("zonadatos");
    var table = document.createElement("table");
    zonadatos.appendChild(table);

    var encabezados = ["Nombre", "Edad", "Cargo", "Salario"];
    var trEncabezados = document.createElement("tr");

    encabezados.forEach(textoEncabezado => {
        var th = document.createElement("th");
        th.textContent = textoEncabezado;
        trEncabezados.appendChild(th);
    });
    table.appendChild(trEncabezados);


    empleados.forEach(empleado => {
        var tr = document.createElement("tr");
        var datosEmpleado = [empleado.nombre, empleado.edad, empleado.cargo, empleado.salario];

        datosEmpleado.forEach(dato => {
            var td = document.createElement("td");
            td.textContent = dato;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    var zonadatos = document.getElementById("zonadatos");
    var boton = document.createElement("button");
    boton.textContent = "Abrir ventana";
    boton.addEventListener("click", abrirVentana);
    zonadatos.appendChild(boton);
}

function abrirVentana() {
    ventanaHija = window.open("nuevaVentana.html", "nueva", "height=1080,width=1920");
    ventanaHija.onload = function() {
        
        var tabla = "<table>";
        tabla += "<tr><th>Nombre</th><th>Edad</th><th>Cargo</th><th>Salario</th></tr>";
        

        empleados.forEach(empleado => {
            tabla += "<tr>";
            tabla += "<td>" + empleado.nombre + "</td>";
            tabla += "<td>" + empleado.edad + "</td>";
            tabla += "<td>" + empleado.cargo + "</td>";
            tabla += "<td>" + empleado.salario + "</td>";
            tabla += "</tr>";
        });

        tabla += "</table>";
        ventanaHija.document.body.innerHTML = tabla;
    };
}

function mostrarEnVentanaNueva() {
    ventanaNueva.document.write("<html><head><title>Tabla de Empleados</title></head><body>");
    ventanaNueva.document.write("<h2>Datos de los Empleados:</h2>");

    var tabla = ventanaNueva.document.createElement('table');
    ventanaNueva.document.body.appendChild(tabla);

    var trEncabezado = ventanaNueva.document.createElement('tr');
    const encabezado = ['Nombre', 'Edad', 'Cargo', 'Salario'];

    encabezado.forEach(dato => {
        var th = ventanaNueva.document.createElement('th');
        th.textContent = dato;
        trEncabezado.appendChild(th);
    });
    tabla.appendChild(trEncabezado);

    empleados.forEach(empleado => {
        var tr = ventanaNueva.document.createElement('tr');
        const datosEmpleados = [empleado.nombre, empleado.edad, empleado.cargo, empleado.salario];

        datosEmpleados.forEach(dato => {
            var td = ventanaNueva.document.createElement('td');
            td.textContent = dato;
            tr.appendChild(td);
        });
        tabla.appendChild(tr);
    });

    ventanaNueva.document.write("</body></html>");
    ventanaNueva.document.close();
}


document.addEventListener("DOMContentLoaded", comenzar);

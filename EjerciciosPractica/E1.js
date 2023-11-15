class Empleado{
    constructor(nombre, edad, cargo, salario){
        this.nombre=nombre;
        this.edad=edad;
        this.cargo=cargo;
        this.salario=salario;
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
            if (empleadosPropiedades !== "") {
                const empleado = new Empleado(empleadosPropiedades[0].trim(), empleadosPropiedades[1].trim(), empleadosPropiedades[2].trim());
                empleados.push(empleado);
            }
        });
        console.log(empleado);

        visualizarDatos();
    };

    lector.readAsText(mi_archivo);
}

    function visualizarDatos(){
        var zonadatos= document.getElementById("zonadatos");
        var tabla = document.createElement("table");
        var tr = document.createElement("tr");
        tabla.appendChild(zonadatos);
        tr.appendChild(tabla);

        empleados.forEach(empleado => {
            var td =document.createElement("td");
            td.textContent=empleado.nombre;
            td.appendChild(tr);
            console.log(empleado)

        });

    }

    document.addEventListener("DOMContentLoaded", comenzar);

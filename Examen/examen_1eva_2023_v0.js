
// Definimos la clase Alumno, con un constructor sobrecargado al cual le
// pasamos por parámetro el nombre del alumno, los apellidos, el expediente y las faltas.
// Además creamos una funcion para calcular el porcentaje de las faltas y la cantidad de faltas restantes pasandoles
// por parametro las faltas actuales, ambas funciones retornan el resultado de respectivas formulas.
// Tambien creamos un array en el que almacenaremos los objetos alumnos, 
// los alumnos seleccionados en el select y un indice para ir
// mostrando los datos de un alumno concreto.
class Alumno {
    constructor(nombre, apellidos, expediente, faltas){
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.expediente=expediente;
        this.faltas=faltas;
    }

     getfaltasPendientes(faltas) {
        var formula=(115 * 0.15) - faltas;
        if(formula > 0 ){
            return formula;
        }else{
            return 0;
        }
    }
    getPorcentaje(faltas){
        return (faltas * 100 / 115); 
    }

}

const alumnos = [];
const alumnosSeleccionados = [];
i=0;

// En la function comenzar() Se crea un addEventListener(escuchador de eventos) para el input
// con el id "file-input". Esto permite seleccionar un archivo.
// La function procesar(e): Se ejecuta cuando se selecciona un archivo, se obtiene dicho archivo
// con archivos[0] y se almacena en la variable mi_archivo. Con FileReader se lee el contenido y
// con onload hace que la función se ejecute cuando el contenido del archivo se ha cargado
// correctamente.
// El contenido del archivo se almacena en la variable resultado y se dividide en líneas con ('\n'). Por
// cada línea se crea una constante alumnoPropiedades con los datos del alumno, que equivale a
// una línea del archivo, se comprueba que esta línea no está vacía y si no lo está se crea un objeto
// Alumno pasándole por parámetro cada propiedad que está en la posicion de la linea quitandoles los espacios en
// blanco a cada lado. Seguidamente se añade cada objeto Alumno al array de objetos alumnos.
// Después de esto, se llama a las funciones cargarSelect().
// y le agregamos al boton la funcion siguienteAlumno().
// Finalmente se lee el archivo con lector.readAsText(mi_archivo).

function comenzar() {
  var archivos = document.getElementById("file-input");
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
        const alumnoPropiedades = linea.split('|');
        if (alumnoPropiedades !== "" && alumnoPropiedades[0] !== "Nombre")  {
            const alumno = new Alumno(alumnoPropiedades[0].trim(), 
            alumnoPropiedades[1].trim(), alumnoPropiedades[2].trim(), alumnoPropiedades[3].trim());
            alumnos.push(alumno);
            console.log(alumno);
        }
    });
    cargarSelect();
    const boton=document.getElementById("siguiente");
    boton.onclick=siguienteAlumno;
  };
  lector.readAsText(mi_archivo);
}

//En la funcion cargarSelect recogemos el id del select en HTML y lo vaciamos.
//Recorremos el array de objetos alumnos y hacemos la comprobacion de si está vacio o no.
//Si no lo esta creamos un option por cada alumno al que le asociamos el nombre del alumno como value
// y el nombre y el apellido como text para que se visualice en el select, estas options se las adjuntamos al select.
function cargarSelect() {
  var select = document.getElementById("datos");
  select.innerHTML = '';

  alumnos.forEach((alumno) => {
    if (alumno.nombre !== "") {
      const option = document.createElement("option");
      option.value = alumno.nombre;
      option.text = alumno.nombre + " " + alumno.apellidos;
      select.appendChild(option);
    }
  });
}

//Aqui recogemos las options seleccionadas del select y las recorremos con
// select.selectedOptions, lo que devuelve una lista de options seleccionados.
// Con el bucle for se recorre estas options y se obtiene su value con
// selectedOptions[i].value, almacenandolo en la variable alumnoValue y recorriendo
// seguidamente el array de objetos alumnos utilizando const alumno = alumnos[j] para
// acceder a cada alumno del array.
// Con el if busca el nombre del alumno que ha sido seleccionado y establece
// y lo añade al array de alumnosSeleccionados
// Finalmente se llama al metodo imprimirAlumnos().
function resultadoSelect() {
    var select = document.getElementById("datos");
    var selectedOptions = select.selectedOptions;

    for (let i = 0; i < selectedOptions.length; i++) {
        var alumnoValue = selectedOptions[i].value;
   
        for (let j = 0; j < alumnos.length; j++) {
          const alumno = alumnos[j];
          if (alumno.nombre === alumnoValue) {
            alumnosSeleccionados.push(alumno);
            console.log(alumnosSeleccionados);
          }
        }
      }
    imprimirAlumnos();
    var select = document.getElementById("datos");
    select.disabled=true;
}

// Con imprimirAlumnos(),
// Se selecciona el alumno seleccionado en el indice i con alumnosSeleccionados[i].
// Seguidamente se le asigna al value de cada input recogido por su identificador cada una de las
// propiedades de este alumno.
// En el value porcentaje y resta, ademas se calculan usando las funciones y pasandoles por 
// parametro las faltas de dicho alumno. Con toFixed se especifica el numero de decimales que se van a imprimir.
function imprimirAlumnos(){

    document.getElementById("nombre").value = alumnosSeleccionados[i].nombre;
    document.getElementById("apellidos").value = alumnosSeleccionados[i].apellidos;
    document.getElementById("expediente").value = alumnosSeleccionados[i].expediente;
    document.getElementById("faltas").value = alumnosSeleccionados[i].faltas;
    document.getElementById("porcentaje").value = alumnosSeleccionados[i].getPorcentaje(alumnosSeleccionados[i].faltas).toFixed(2);
    document.getElementById("resta").value = alumnosSeleccionados[i].getfaltasPendientes(alumnosSeleccionados[i].faltas).toFixed(0);
}

//Con esta funcion se pasa al siguiente alumno sumandole uno al indice.
function siguienteAlumno(){

    if(i<alumnosSeleccionados.length -1){
        i=i + 1;
    }

    resultadoSelect();
}
document.addEventListener("DOMContentLoaded", comenzar);

// Crea un formulario HTML con elementos input que aún no hayamos utilizado (por ejemplo: date, range, password, tel, url, etc).

// A continuación, mediante código javascript, visualiza el contenido de los datos rellenos del formulario en un elemento <p> o <pre> o <div> ....

// Utiliza las estructuras de nivel 0 o nivel 2 del DOM vistas en la teoría para referenciar los elementos.

// Tiempo estimado = 3h

// La entrega debe constar de: (evitar comprimir en un fichero la entrega)

//  fichero de práctica explicando el código y con capturas del funcionamiento.
// Todos los fichero .js .html .css que se hayan utilizado.


function recogerDatos() {
    var formulario = document.querySelector(".formulario");
    const inputs = formulario.elements;
    var datos = "";
    var zonadatos = document.querySelector(".zonadatos");

    for (let i = 0; i < inputs.length; i++) {
        datos += inputs[i].name + ": " + inputs[i].value + "<br>";
        console.log(datos);
    }
    zonadatos.innerHTML = datos;
}


//https://es.stackoverflow.com/questions/145220/obtener-datos-de-un-formulario-y-almacenarlos-en-variables
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements


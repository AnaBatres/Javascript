function iniciar(){
    document.getElementById('crearParrafo').addEventListener('click', crearParrafo);
    document.getElementById('crearImagen').addEventListener('click', crearImagen);
    document.getElementById('borrarUltimo').addEventListener('click', borrarUltimo);
    document.getElementById('borrarPrimero').addEventListener('click', borrarPrimero);
    document.getElementById('sustituirPrimeroVacio').addEventListener('click', sustituirPrimeroVacio);

    zonadatos= document.getElementById("zonaDatos");
    textArea = document.getElementById("textarea");
}

function crearParrafo(){
    p = document.createElement("p");
    texto = document.createTextNode(textArea.value);
    p.appendChild(texto);
    zonadatos.appendChild(p);
    p.setAttribute("class", "miClase");
}

function crearImagen(){
    img = document.createElement("img");
    imagen = prompt("Introduce el nombre de la imagen");
    ruta = "imagenes/" + imagen + ".jpg";
    if (imagen.trim() !== ""){
        img.setAttribute("src", ruta);
        zonadatos.appendChild(img);
    } else{
        p = document.createElement("p");
        p.innerHTML = "Introduce el nombre de la imagen"
        zonadatos.appendChild(p);
    }
}

function borrarUltimo(){
    ultimoHijo = zonadatos.lastChild;
    zonadatos.removeChild(ultimoHijo);
}

function borrarPrimero(){
    primerHijo = zonadatos.firstChild;
    zonadatos.removeChild(primerHijo);
}

function sustituirPrimeroVacio(){
    p = document.createElement("p");
    p.innerHTML = "Vacio";
    primerHijo = zonadatos.firstChild;
    zonadatos.replaceChild(p, primerHijo);
}


window.addEventListener('DOMContentLoaded', iniciar);


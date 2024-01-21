function iniciar() {
    document.getElementById('cambiarTextos').addEventListener('click', cambiarTextos);
    document.getElementById('cambiarClases').addEventListener('click', cambiarClases);
    document.getElementById('quitarClases').addEventListener('click', quitarClases);

    parrafo1 = document.getElementById('parrafo1');
    parrafo2 = document.getElementById('parrafo2');
    parrafo3 = document.getElementById('parrafo3');
    etiquetas = document.getElementsByTagName('p');
    clases = document.getElementsByClassName('miClase');
} 


function cambiarTextos(){
    quitarClases();
    parrafo1.innerHTML = "Primer párrafo cambiado";
    
    etiquetas[1].innerHTML = "Segundo párrafo cambiado";

    parrafo3.setAttribute("class", "miClase");
    clases[0].innerHTML = "Tercer párrafo cambiado";
}

function cambiarClases(){
    parrafo1.setAttribute("class", "miClase");
    parrafo2.className = 'miClase';
}

function quitarClases(){
    parrafo1.setAttribute("class", "");
    for (i = 0; i < etiquetas.length; i++) {
        etiquetas[i].className = '';
    } 
}

window.addEventListener('DOMContentLoaded', iniciar);



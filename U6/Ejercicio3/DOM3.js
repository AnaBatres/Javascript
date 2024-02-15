function iniciar() {
    h2s = document.getElementsByTagName("h2");
    for (let i = 0; i < h2s.length; i++) {
        h2s[i].addEventListener("click", recorrerAdelante);
    }

    zonadatos= document.getElementById("zonadatos");
}

function recorrerAdelante(e) {
    h2seleccionado = e.target;
    id = h2seleccionado.parentNode.id;

    ulprovincias = h2seleccionado.nextElementSibling;
    console.log(ulprovincias);
    numProvincias = ulprovincias.childElementCount;
    
    texto = "Has elegido " + h2seleccionado.textContent + 
            " que está situada en el " + id + 
            " de España." + " El número de provicias es: " + 
            numProvincias + ". Las provincias son: ";

    primerHijo = ulprovincias.firstChild;
    while (primerHijo !== null) {
        texto = texto + primerHijo.textContent + "\n";
        primerHijo = primerHijo.nextElementSibling;
    }
    
    zonadatos.innerHTML=texto;
}

window.addEventListener('DOMContentLoaded', iniciar);


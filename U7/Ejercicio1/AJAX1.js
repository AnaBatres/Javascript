function iniciar(){
    document.getElementsByTagName("button")[0].addEventListener("click", cambiarContenido);
}

function cambiarContenido(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("texto").innerHTML = this.responseText;
       }
    };
    xhttp.open("GET", "holamundo.txt", true);
    xhttp.send();
}

window.addEventListener('load', iniciar);

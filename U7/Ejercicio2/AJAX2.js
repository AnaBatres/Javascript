function iniciar() {
    document.querySelector("button").addEventListener("click", cargaCatalogo);
    texto = document.getElementById("texto");
    tabla = document.createElement("table");
    texto.appendChild(tabla);
}

function cargaCatalogo() {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cargaXML(this);
        }
    };
    xhttp.open("GET", "catalogo.xml", true);
    xhttp.send();

}

function cargaXML(xml) {
    ficheroXML = xml.responseXML;
    elementosXML = ficheroXML.getElementsByTagName("CD");
    
    tablaContenido = 
    "<tr><th>Title</th><th>Artist</th><th>Country</th><th>Company</th><th>Price</th><th>Year</th></tr>";
    
    for (let i = 0; i < elementosXML.length; i++) {
        tablaContenido += "<tr>";
        tablaContenido += "<td>" + elementosXML[i].getElementsByTagName("TITLE")[0].textContent + "</td>";
        tablaContenido += "<td>" + elementosXML[i].getElementsByTagName("ARTIST")[0].textContent + "</td>";
        tablaContenido += "<td>" + elementosXML[i].getElementsByTagName("COUNTRY")[0].textContent + "</td>";
        tablaContenido += "<td>" + elementosXML[i].getElementsByTagName("COMPANY")[0].textContent + "</td>";
        tablaContenido += "<td>" + elementosXML[i].getElementsByTagName("PRICE")[0].textContent + "</td>";
        tablaContenido += "<td>" + elementosXML[i].getElementsByTagName("YEAR")[0].textContent + "</td>";
        tablaContenido += "</tr>";
    }
    
    tabla.innerHTML = tablaContenido;
}

window.addEventListener('load', iniciar);
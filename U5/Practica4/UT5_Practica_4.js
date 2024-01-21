var mensaje = "";

window.onload = iniciar;

function iniciar() {
    document.getElementById("Contrasena").addEventListener('input', validarContrasena);
    document.getElementById("Telefono").addEventListener('input', validarTelefono);
    document.getElementById("Url").addEventListener('input', validarUrl);
    document.getElementById("boton").addEventListener('click', recogerFormulario);
}

function validarContrasena() {
    var contrasena = document.getElementById("Contrasena");
    if (!contrasena.checkValidity()) {
        mensaje = "Contraseña incorrecta";
        mostrarError();
        return false;
    } else {
        borrarError();
        return true;
    }
}

function validarTelefono() {
    var telefono = document.getElementById("Telefono");
    if (!telefono.checkValidity()) {
        mensaje = "Teléfono incorrecto";
        mostrarError();
        return false;
    } else {
        borrarError();
        return true;
    }
}

function validarUrl() {
    var url = document.getElementById("Url");
    if (!url.checkValidity()) {
        mensaje = "Url incorrecta";
        mostrarError();
        return false;
    } else {
        borrarError();
        return true;
    }
}

function validar(e) {
    if (!validarContrasena() || !validarTelefono() || !validarUrl()) {
        e.preventDefault();
        return false;
    }
    return true;
}

function mostrarError() {
    document.getElementById("error").innerHTML = mensaje;
    
}

function borrarError() {
    document.getElementById("error").innerHTML = "";
    mensaje = ""; 
}

function recogerFormulario() {
    var formulario = document.querySelector(".formulario");
    var zonadatos = document.getElementById("error");
    var inputs = formulario.elements;
    var datos = "";

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].id !== "boton" && validar()) {
            datos += inputs[i].name + ": " + inputs[i].value + "<br>";
                    zonadatos.innerHTML = datos;
        }
    }
}

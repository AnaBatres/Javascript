document.addEventListener('DOMContentLoaded', function () {
    var boton = document.getElementById('boton');
    var zonadatos = document.querySelector(".zonadatos");

    boton.addEventListener('click', function () {
        recogerFormulario();
        recogerSelect();
    });


    //Ejercicio 1 
    function recogerFormulario() {
        var formulario = document.querySelector(".formulario");
        var inputs = formulario.elements;
        var datos = "";

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].id !== "selectMultiple" && inputs[i].id !== "selectGroup"
                && inputs[i].id !== "boton") {
                datos += inputs[i].name + ": " + inputs[i].value + "<br>";
            }
            zonadatos.innerHTML = datos;
        }
    }

    //Ejercicio 2.2
    var opcionesSelect = [];

    function recogerSelect() {
        habilitarSelect();
        opcionesSelect = [];
        var selectMultiple = document.getElementById("selectMultiple");
        var opSelect = selectMultiple.selectedOptions;

        for (var i = 0; i < opSelect.length; i++) {
            var option = opSelect[i];
            opcionesSelect.push(option.value);
        }
        deshabilitar();
    }
    function deshabilitar() {
        var selectGroup = document.getElementById("selectGroup");
        var opSelectGroup = selectGroup.getElementsByTagName("optgroup");

        for (let i = 0; i < opSelectGroup.length; i++) {
            for (let j = 0; j < opcionesSelect.length; j++) {
                if (opSelectGroup[i].label === opcionesSelect[j]) {
                    opSelectGroup[i].disabled = true;
                }
            }
        }
    }
    function habilitarSelect() {
        var selectGroup = document.getElementById("selectGroup");
        var opSelectGroup = selectGroup.getElementsByTagName("optgroup");

        for (let i = 0; i < opSelectGroup.length; i++) {
            opSelectGroup[i].disabled = false;
        }
    }
});


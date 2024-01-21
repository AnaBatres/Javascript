// Crea un formulario HTML con dos controles o elementos: un select con opciones y el otro un select con agrupaciones de 
// opciones (optgroup) de manera que el primero permita 
// deshabilitar un grupo o varios grupos de opciones del segundo.

var opcionesSelect = [];

function recogerSelect() {
    habilitarSelect();
    opcionesSelect = []; 
    var select = document.getElementById("select");
    var opSelect = select.selectedOptions;

    for (var i = 0; i < opSelect.length; i++) {
        var option = opSelect[i];
        opcionesSelect.push(option.value);
    }
    console.log(opcionesSelect);
    deshabilitar(); 
}

function deshabilitar() {
    var selectAg = document.getElementById("selectAg");
    var opSelectAg = selectAg.getElementsByTagName("optgroup");

    for (let i = 0; i < opSelectAg.length; i++) {
        for (let j = 0; j < opcionesSelect.length; j++) {
            if (opSelectAg[i].label === opcionesSelect[j]) {
                opSelectAg[i].disabled = true; 
            } 
        }
    }
}   

function habilitarSelect(){
    var selectAg = document.getElementById("selectAg");
        var opSelectAg = selectAg.getElementsByTagName("optgroup");

        for (let i = 0; i < opSelectAg.length; i++) {
                    opSelectAg[i].disabled = false; 
            }
}



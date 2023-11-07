// Crea un array llamado elementos que tenga 10 datos de tipo string (tipo primitivo).
elementos = ['elemento1', 'elemento2', 'elemento3', 'elemento4', 'elemento5', 
                   'elemento6', 'elemento7', 'elemento8', 'elemento9', 'elemento10'];

// Visualiza por pantalla todo el contenido del array, 
//separando cada dato en líneas distintas.

    document.write('<h3>ARRAY</h3>');
    for (i = 0; i < elementos.length; i++) {
        document.write(elementos[i] + "<br>");
        console.log(elementos[i]);
    }

// Añade al array un dato más. (mediante el uso [longitud]
    document.write('<h3>ARRAY CON UN DATO MAS</h3>');
    longitud=elementos.length;
    elementos[longitud] = 'elemento11';

    for (i = 0; i < elementos.length; i++) {
        document.write(elementos[i] + " , ");
        console.log(elementos[i]);
    }
    

// Añade al array dos datos más mediante utilizando un solo método.
document.write('<h3>ARRAY CON DOS DATOS MAS</h3>');
elementos.push('elemento12', 'elemento13');

for (i = 0; i < elementos.length; i++) {
    document.write(elementos[i] + " , ");
    console.log(elementos[i]);
    }

// Añade un dato más al principio del array.
document.write('<h3>ARRAY CON UN DATO AL PRINCIPIO</h3>');
elementos.unshift('elementoInicio');

for (i = 0; i < elementos.length; i++) {
    document.write(elementos[i] + " , ");
    console.log(elementos[i]);
}

// Localiza un cierto dato dentro del array.
document.write('<h3>LOCALIZACION DE ELEMNTO5 EN EL ARRAY</h3>');
document.write("El elemento5 se encuentra en la posicion: " + elementos.indexOf('elemento5'));

// Elimina los últimos tres datos del array.
    document.write('<h3>ELIMINA LOS ULTIMOS TRES ELEMENTOS</h3>');
    elementos=elementos.splice(0,11);
    document.write("<br>");
    document.write(elementos);
    console.log(elementos);

// Crea un sub-array llamado array_recortado con los datos del array elementos, 
//comprendidos entre la posición 4 y 8 (ambos inclusive).
document.write('<h3>SUB-ARRAY RECORTADO CON ELEMENTOS ENTRE POSICION 4 Y 8</h3>');
array_recortado=elementos.slice(4,9);
for (i = 0; i < array_recortado.length; i++) {
    document.write(array_recortado[i] + " , ");
    console.log(array_recortado[i]);
}

// Crea un nuevo array llamado elementos_MYCLS con los datos del array elementos en mayúsculas.
document.write('<h3>ELEMENTOS EN MAYUSCULAS</h3>');
for (i = 0; i < elementos.length; i++) {
    elementos_MYCLS=elementos[i].toUpperCase();
    document.write(elementos_MYCLS + ' , ');
    }


    
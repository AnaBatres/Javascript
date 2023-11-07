        var datos = new Array();

        function comenzar() {
            var archivos = document.getElementById("archivos");
            archivos.addEventListener("change", procesar, false);
        }

        function procesar(e) {
            var archivos = e.target.files;
            var mi_archivo = archivos[0];
            var lector = new FileReader();
            
            lector.onload = function (e) {
                var resultado = e.target.result;
                datos = resultado.split('\n');
                visualizarDatos();
            };

            lector.readAsText(mi_archivo);
        }

        function visualizarDatos() {
            var zonadatos = document.getElementById("zonadatos");
            var contenido = "";

            for (var i = 0; i < datos.length; i++) {
                contenido += datos[i] + "<br>";
            }

            zonadatos.innerHTML = contenido;
        }

        document.addEventListener("DOMContentLoaded", comenzar);




        
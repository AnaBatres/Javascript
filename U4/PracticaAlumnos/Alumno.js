export default class Alumno {
    constructor(nombre, candidato) {
      this.nombre = nombre;
      this.candidato = false;
      this.votos = 0;
    }

    get candidato(){
        return this.candidato;
    }

    set candidato(valor){
        this.candidato=valor;
    }



  }
export default class Alumno {
    constructor(nombre, candidato) {
      this.nombre = nombre;
      this.candidato = candidato;
      this.votos = 0;
    }
  
    getCandidato() {
      return this.candidato;
    }
  
    setCandidato(candidato) {
      this.candidato = candidato;
    }
  
    setVotos() {
      this.votos++;
    }
  
    getVotos() {
      return this.votos;
    }
  }
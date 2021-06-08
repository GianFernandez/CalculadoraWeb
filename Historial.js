const OPERACIONES_KEY = "operaciones";

class Historial {
    constructor() {
        this.arregloDeOperaciones = [];
        this.cargarOperacionesDeLocalStorage();
        this.subirOperacionesAlLocalStorage();
    }

    cargarOperacionesDeLocalStorage() {
        if (localStorage.getItem(OPERACIONES_KEY) != undefined) {
            this.arregloDeOperaciones = JSON.parse(localStorage.getItem(OPERACIONES_KEY));
        }
    }

    subirOperacionesAlLocalStorage() {
        localStorage.setItem(OPERACIONES_KEY, JSON.stringify(this.arregloDeOperaciones));
    }

    agregarOperacionAHistorial(operacion) {
        this.arregloDeOperaciones.push(operacion);
        this.subirOperacionesAlLocalStorage();
    }

    borrarHistorial() {
        this.arregloDeOperaciones = [];
        localStorage.removeItem(OPERACIONES_KEY);
    }

}
class Calculadora {
    constructor() {
        this.historial = new Historial();
    }

    sumar(num1, num2) {
        this.historial.agregarOperacionAHistorial(new Calculacion(num1, "+", num2));
        return num1 + num2;
    }

    restar(num1, num2) { 
        this.historial.agregarOperacionAHistorial(new Calculacion(num1, "-", num2));
        return num1 - num2;
    }

    dividir(num1, num2) {
        this.historial.agregarOperacionAHistorial(new Calculacion(num1, "/", num2));
        return num1 / num2;
    }

    multiplicar(num1, num2) {
        this.historial.agregarOperacionAHistorial(new Calculacion(num1, "x", num2));
        return num1 * num2;
    }
}

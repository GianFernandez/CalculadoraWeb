const VALOR_ACTUAL_KEY = "valorActual";
const VALOR_ANTERIOR_KEY = "valorAnterior";
const TIPO_DE_OPERACION_KEY = "tipoDeOperacion";

class Display {
    
    constructor(displayValorAnterior, displayValorActual) {
        this.displayValorActual = displayValorActual;
        this.displayValorAnterior = displayValorAnterior;
        this.calculador = new Calculadora();
        this.tipoOperacion = undefined;
        this.valorActual = '';
        this.valorAnterior = '';
        this.signos = {
            sumar: '+',
            dividir: '%',
            multiplicar: 'x',
            restar: '-', 
        }


        this.cargaEstadoDeLocalStorage();
        this.publicarValores();
    }

    cargaEstadoDeLocalStorage() {
        if (localStorage.getItem(TIPO_DE_OPERACION_KEY) != undefined) {
            this.tipoOperacion = localStorage.getItem(TIPO_DE_OPERACION_KEY);
        }

        if (localStorage.getItem(VALOR_ANTERIOR_KEY) != undefined) {
            this.valorAnterior = localStorage.getItem(VALOR_ANTERIOR_KEY);
        }

        if (localStorage.getItem(VALOR_ACTUAL_KEY) != undefined) {
            this.valorActual = localStorage.getItem(VALOR_ACTUAL_KEY);
        }
    }

    borrar() {
        this.valorActual = this.valorActual.toString().slice(0,-1);
        this.publicarValores();
    }

    borrarTodo() {
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        this.publicarValores();
    }

    computar(tipo) {
        this.tipoOperacion !== 'igual' && this.calcular();
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = '';
        this.publicarValores();
    }

    agregarNumero(numero) {
        if(numero === '.' && this.valorActual.includes('.')) return
        this.valorActual = this.valorActual.toString() + numero.toString();
        this.publicarValores();
    }

    publicarValores() {
        this.imprimirValores();
        this.subeEstadoALocalStorage();
    }

    imprimirValores() {
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }

    subeEstadoALocalStorage() {
        localStorage.setItem(VALOR_ANTERIOR_KEY, this.valorAnterior);
        localStorage.setItem(VALOR_ACTUAL_KEY, this.valorActual);
        localStorage.setItem(TIPO_DE_OPERACION_KEY, this.tipoOperacion);
    }

    calcular() {
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        if( isNaN(valorActual)  || isNaN(valorAnterior) ) return

        const resultado = this.calculador[this.tipoOperacion](valorAnterior, valorActual);
        this.valorActual = resultado;
    }
}
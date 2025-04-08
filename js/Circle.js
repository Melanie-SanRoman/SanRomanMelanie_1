class Circle extends Figura {
    constructor(posX, posY, fill, context, border, radio) {
        super(posX, posY, fill, context, border);
        this.radio = radio;
    }
    /**
     * Dibuja la figura en el contexto del canvas
     */
    draw() {
        this.context.fillStyle = this.fill;
        this.context.beginPath(); // limpia ruta
        this.context.arc(this.posX, this.posY, this.radio, 0, 2 * Math.PI);
        this.context.fill(); // rellenar
        if(this.border){
            this.context.stroke(); // borde
        }
    }
    /**
     * Devuelve true si la coordenada selecionada, se encuentra dentro de la figura
     * @param {posX} x 
     * @param {posY} y 
     * @returns true or false
     */
    contieneCoordenada(x, y) {
        let xx = this.posX - x;
        let yy = this.posY - y;
        return ((Math.sqrt(xx * xx + yy * yy) <= this.radio));
    }
    getName() {
        return "Circle";
    }
}
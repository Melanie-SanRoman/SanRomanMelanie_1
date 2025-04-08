class Square extends Figura{
    constructor(posX, posY, fill, context, border, lado) {
        super(posX, posY, fill, context, border);
        this.lado = lado;
    }

    /**
     * Dibuja la figura en el contexto del canvas
     */
    draw() {
        this.context.fillStyle = this.fill;
        this.context.beginPath();
        this.context.rect(this.posX, this.posY, this.lado, this.lado);
        this.context.fill();
        if (this.border) {
            this.context.stroke();
        }
    }

    /**
     * Devuelve true si la coordenada selecionada, se encuentra dentro de la figura
     * @param {posX} x 
     * @param {posY} y 
     * @returns true or false
     */
    contieneCoordenada(x, y) {
        return ((x >= this.posX) && (x < this.posX + this.lado) &&
            (y > this.posY) && (y < this.posY + this.lado));
    }   

    getName() {
        return "Square";
    }
}
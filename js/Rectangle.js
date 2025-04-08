class Rectangle extends Figura {
    constructor(posX, posY, fill, context, border, width, height) {
        super(posX, posY, fill, context, border);
        this.width = width;
        this.height = height;
    }
    /**
     * Dibuja la figura en el contexto del canvas
     */
    draw() {
        this.context.fillStyle = this.fill;
        this.context.beginPath();
        this.context.rect(this.posX, this.posY, this.width, this.height);
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
        return ((x >= this.posX) && (x < this.posX + this.width) &&
            (y > this.posY) && (y < this.posY + this.height));
    }

    getName() {
        return "Rectangle";
    }
}
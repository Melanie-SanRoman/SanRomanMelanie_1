class Figura {
    
    constructor(posX, posY, fill, context, border) {
        this.posX = posX; // Coordenadas originales de la figura
        this.posY = posY;
        this.fill = fill; // color de relleno
        this.context = context;
        this.border = border;
    }

    draw() { } // abstracto

    getName() { } // abstracto

    getX() {
        return this.posX;
    }

    getY() {
        return this.posY;
    }
    
    setX(posX) {
        this.posX = posX;
    }

    setY(posY) {
        this.posY= posY;
    }
    
    moveTo(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }

    altX(deltaX) {
        this.posX = this.posX + deltaX;
    }

    altY(deltaY) {
        this.posY = this.posY + deltaY;
    }

    setBorder(border) {
        this.border = border;
    }

    contieneCoordenada(x, y) {
        return null;
    }

}

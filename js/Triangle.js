class Triangle extends Figura {
    constructor(posX, posY, fill, context, border, base, altura) {
        super(posX, posY, fill, context, border);
        this.base = base;
        this.altura = altura;
    }
    /**
     * Dibuja la figura en el contexto del canvas
     */
    draw() {
        this.context.fillStyle = this.fill;
        this.context.beginPath();
        this.context.moveTo(this.posX, this.posY);
        this.context.lineTo(this.posX + this.base, this.posY);
        this.context.lineTo(this.posX + this.base / 2, this.posY - this.altura);
        this.context.closePath();
        this.context.fill();
        if (this.border) {
            this.context.stroke();
        }
    }

    contieneCoordenada(x, y) {
        // Vértices del triángulo
        const Ax = this.posX, Ay = this.posY;
        const Bx = this.posX + this.base, By = this.posY;
        const Cx = this.posX + this.base / 2, Cy = this.posY - this.altura;

        // Función para calcular el área de un triángulo
        function area(x1, y1, x2, y2, x3, y3) {
            return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
        }

        const areaABC = area(Ax, Ay, Bx, By, Cx, Cy);
        const areaPBC = area(x, y, Bx, By, Cx, Cy);
        const areaAPC = area(Ax, Ay, x, y, Cx, Cy);
        const areaABP = area(Ax, Ay, Bx, By, x, y);

        const total = areaPBC + areaAPC + areaABP;

        // Permitimos un pequeño error de cálculo (por decimales)
        return Math.abs(total - areaABC) < 0.5;
    }

    getName() {
        return "Isosceles triangle";
    }
}
const CANVAS = document.getElementById("miCanvas"); // Captura el canvas y lo guarda en una variable
const CXT = CANVAS.getContext('2d'); // Obtiene el contexto y lo guarda en una variable

const MODAL = document.querySelector('.modal');
const INFO_MODAL = document.querySelector('.info-modal');
const FIG_INFO = document.getElementById("figSelecc");

// Define en variables ancho y alto del canvas
const CANVAS_WIDTH = CANVAS.width;
const CANVAS_HEIGHT = CANVAS.height;

let figSeleccionada = null; // Define la variable que controlara si se encuenta una figura seleccionada
let figMove = null; // Define la variable que controlara si se encuenta una figura en moviento

let figuras = []; // Define el arreglo que almacenara las figuras
const CANT_FIG = 40; // Estable el tamaño maximo de figuras a crear

// Define las variable que controlaran los eventos del mouse
let mouseUp = false;
let mouseDown = false;

// Define las variables que controlaran el offset en X e Y
let offsetX = 0, offsetY = 0;

// MANEJO DE EVENTOS

MODAL.addEventListener('click', closeModal);
CANVAS.addEventListener('mousedown', clickTrue);
CANVAS.addEventListener('mouseup', clickFalse);
CANVAS.addEventListener('mousemove', mouseMove);
CANVAS.addEventListener('dblclick', selecFig);
CANVAS.addEventListener('keydown', keyMove);
document.getElementById('btn-generar').addEventListener('click', generar);
document.getElementById('btn-limpiar').addEventListener('click', limpiar);
document.getElementById('btn-info').addEventListener('click', openModal);


// DEFINICION DE FUNCION ONLOAD

/**
 * Funcion que se llama al recargar la pagina
 */
function main() {
    pintarCanvas();
    //openModal();
    // Escribe por pantalla 
    document.getElementById("figSelecc").innerHTML = `No hay figura seleccionada`;
}


// DEFINICION DE FUNCIONES QUE CONTROLAN EL MODAL

/**
 * Funcion que oculta el modal con su transicion
 */
function closeModal() {
    INFO_MODAL.classList.remove("fade-in");
    INFO_MODAL.classList.add("fade-out");

    setTimeout(() => {
        MODAL.style.display = "none";
        INFO_MODAL.classList.remove("fade-out"); // limpia por si se se vuelve a abrir
    }, 400);
}

/**
 * Funcion que muestra el modal con su transicion
 */
function openModal() {
    MODAL.style.display = 'flex';
    MODAL.style.display = "block";
    INFO_MODAL.classList.add("fade-in");
}

/**
 * Funcion que actualiza el mensaje que indica la figura seleccionada
 * @param {*} name 
 */
function actualizarNameFig(name) {
    FIG_INFO.innerHTML = `<span class="icon">📌</span> La figura seleccionada es: <strong>${name}</strong>`;

    FIG_INFO.classList.remove("fade"); // reinicia animación
    void FIG_INFO.offsetWidth;   
    FIG_INFO.classList.add("fade");    // vuelve a activar animación
}


// DEFINICION DE FUNCIONES QUE CONTROLAN EL COMPORTAMIENTO

/**
 * Calcula la posicion relativa con respecto al canvas
 * @param {*} e 
 * @returns 
 */
function getMousePosRel(e) {
    // declara dentro de la funcion para que se mantenga actualizado al scrollear en la pantalla o hacer zoom in o zoom out
    let rect = CANVAS.getBoundingClientRect();
    return {
        x: e.clientX - rect.left, // Calcula la posición X relativa al canvas
        y: e.clientY - rect.top  // Calcula la posición Y relativa al canvas
    };
}

/**
 * Funcion que detecta un click con el mouse dentro del canvas e identifica si se encuentra una figura en dicha coordenada,
 * si es asi, procede a dibujar un borde en la misma
 */
function clickTrue(e) {
    if (figSeleccionada) { // si al hacer click, ya se encuentra una figura seleccionada(por dblClick)
        figSeleccionada.setBorder(false); // setea su borde a false
        dibujarFiguras(); // redibuja las figuras
    }
    let { x, y } = getMousePosRel(e); // obtiene la posicion relativa del mouse

    figSeleccionada = buscarFigura(x, y); // busca si hay una figura bajo el click
    if (figSeleccionada) { // si hay una figura
        figSeleccionada.setBorder(true); // setea el borde a true
        figSeleccionada.draw(); // chequear -> dibuja la imagen pero esta vez con la condicion de border en true

        //Calcula la diferencia entre el click y el origen de la figura, para que cuando se arrastre, 
        //no salte directamente al mouse, sino que mantenga la posición relativa.
        offsetX = x - figSeleccionada.getX();
        offsetY = y - figSeleccionada.getY();

        figMove = figSeleccionada; // define que esa figura esta en movimiento

        actualizarNameFig(figSeleccionada.getName());
        mouseDown = true;
        mouseUp = false;
    }
}

/**
 * Funcion que permite el movimiento de las figuras a traves del click del mouse
 * @param {*} e 
 * @returns 
 */
function mouseMove(e) {
    // fi no hay ninguna figMove o figSeleccionada, no hace nada
    if (!figMove || !figSeleccionada) return;

    let { x, y } = getMousePosRel(e);

    // Mueve la figura según la posición del mouse menos el offset
    figSeleccionada.setX(x - offsetX);
    figSeleccionada.setY(y - offsetY);

    dibujarFiguras(); // Redibuja todas las figuras
}

/**
 * Funcion que detecta cuando se deja de clickear una parte del canvas, si habia una figura
 * despinta el borde de la misma
 */
function clickFalse(e) {
    mouseUp = true;
    mouseDown = false;
    if (figSeleccionada) { // si hay una figura seleccionada
        figSeleccionada.setBorder(false); //setea su borde a false
        dibujarFiguras(); // redibuja, pero esta vez con la nueva condicion de border
        document.getElementById("figSelecc").innerHTML = `No hay figura seleccionada`;
    }
    // limpia variables para que no se muevan si no se sigue haciendo click
    figMove = null;
    figSeleccionada = null;
}

/**
 * Funcion que detecta un dblClick en el canvas, si hay una figura, pinta el borde de la misma
 * @param {*} e 
 */
function selecFig(e) {
    let { x, y } = getMousePosRel(e);

    figSeleccionada = buscarFigura(x, y);
    if (figSeleccionada) {
        figSeleccionada.setBorder(true);
        figSeleccionada.draw(); // dibuja la imagen pero esta vez con la condicion de border en true
        figMove = null; // define que ninguna figura esta en movimiento(solo queda seleccionada, se debe mover con el teclado)

        actualizarNameFig(figSeleccionada.getName());
    }
    mouseDown = false;
    mouseUp = false;
}

/**
 * Funcion que detecta el comportamiento del teclado, y permite el movimiento de las figuras seleccionadas
 * @param {*} e 
 */
function keyMove(e) {
    if (figSeleccionada) { // si se oprime el teclado y hay una figura seleccionada
        switch (e.key) { // detecta el codigo del evento teclado
            case "ArrowLeft":
                // left key 
                figSeleccionada.altX(-2);
                break;
            case "ArrowUp":
                // up key 
                figSeleccionada.altY(-2);
                break;
            case "ArrowRight":
                // right key 
                figSeleccionada.altX(2);
                break;
            case 'ArrowDown':
                // down key 
                figSeleccionada.altY(2);
                break;
        } // depende la tecla oprimida altera en un +-2, la posision de X e Y (posicion original x/y mas +2/-2)
        dibujarFiguras(); // redibuja las figuras con su nueva posicion
    }
    return;
}

/**
 * Funcion que se activa al apretar el boton 'btn-generar', se encarga de limpiar el canvas y crear las figuras
 */
function generar() {
    figuras = []; // vacia el array de figuras, en caso de haberse oprimido antes
    document.getElementById("figSelecc").innerHTML = `No hay figura seleccionada`;
    pintarCanvas();
    crearFiguras();
}

/**
 * Funcion que se activa al apretar el boton 'btn-limpiar', se encarga de limpiar el canvas y vacia el array de figuras
 */
function limpiar() {
    figuras = [];
    document.getElementById("figSelecc").innerHTML = `No hay figura seleccionada`;
    CXT.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

/**
 * "Limpia" el canvas, pintandolo de un unico color solido
 */
function pintarCanvas() {
    let rect = new Rectangle(0, 0,'rgb(255, 255, 255)', CXT, false, CANVAS_WIDTH, CANVAS_HEIGHT);
    rect.draw();
}

/**
 * Funcion que crea figuras acorde al tam asignado en CANT_FIG
 */
function crearFiguras() {
    let div = CANT_FIG / 4;
    while (figuras.length < div) {
        addFigura(0); // rectangulo
    }
    div += div += div;
    while (figuras.length < div) {
        addFigura(1); // crea por cada circulo, un cuadrado, para respetar la combinacion de colores complementarios
    }
    while (figuras.length < CANT_FIG) {
        addFigura(3); // triangulo
    }
}

/**
 * Funcion que crea las figuras determinando sus caracteristicas de manera aleatoria y decidiendo que 
 * tipo de figura es acorde al parametro que reciba
 * @param {*} param 
 */
function addFigura(param) {
    let color = randomRGBA();
    let { posX, posY } = randomPosXPosY();

    if (param == 0) {
        let rect = new Rectangle(
            posX, posY, color, CXT, false,
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100));
        figuras.push(rect); // agrega la figura al array de figuras
        rect.draw(); // dibuja la figura creada
    }
    if (param == 1) {
        let { colorCirc, colorSqu } = randomColores();

        let circ = new Circle(
            posX, posY, colorCirc, CXT, false,
            Math.round(Math.random() * 100));
        figuras.push(circ);
        circ.draw();

        // vuelve a declarar las variables para que no coicidan con el circulo ya que se 
        // crean al mismo tiempo en la misma ejecucion de la funcion
        ({ posX, posY } = randomPosXPosY());
        let squ = new Square(
            posX, posY, colorSqu, CXT, false,
            Math.round(Math.random() * 100));
        figuras.push(squ);
        squ.draw();
    }
    if (param == 3) {
        let tri = new Triangle(
            posX, posY, color, CXT, false,
            Math.round(Math.random() * 100), 
            Math.round(Math.random() * 100));
        figuras.push(tri);
        tri.draw();
    }
}
/**
 * Funcion que escoge de manera aleatoria una combinacion de colores complementarios de un arreglo predefinido
 * @returns 
 */
function randomColores() {
    let colores = [
        ['#FF5733', '#33C3FF'],
        ['#6A0572', '#F4A261'],
        ['#2E933C', '#933C2E'],
        ['#FFD700', '#0033A0'],
        ['#D72638', '#1B998B']
    ]

    let index = Math.floor(Math.random() * colores.length);
    return {
        colorCirc: colores[index][0], // asigna la posicion 0 a los circulos
        colorSqu: colores[index][1] // asigna la posicion 1 a los cuadrados
    }
}

/**
 * Funcion que crea una combinacion RGBA de manera aleatoria
 * @returns 
 */
function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = Math.round(Math.random() * 255);
    return `rgba(${r},${g},${b},${a})`;
}
/**
 * Funcion que crea una posicion X e Y de manera aleatoria
 * @returns 
 */
function randomPosXPosY() {
    return {
        posX: Math.round(Math.random() * CANVAS_WIDTH),
        posY: Math.round(Math.random() * CANVAS_HEIGHT)
    }
}

/**
 * Funcion que pinta el canvas y recorre el array de figuras y las dibuja
 */
function dibujarFiguras() {
    pintarCanvas();
    for (i = 0; i < figuras.length; i++) {
        figuras[i].draw();
    }
}

/**
 * Funcion que busca una figura en una coordenada dada, en caso de haber dos figuras, devuelve la ultima 
 * agregada al array(la que este mas arriba visualmente), ya que recorre de atras hacia adelante el array de figuras
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function buscarFigura(x, y) {
    for (i = figuras.length - 1; i >= 0; i--) {
        let unaFigura = figuras[i];
        if (unaFigura.contieneCoordenada(x, y)) {
            return unaFigura;
        }
    }
    document.getElementById("figSelecc").innerHTML = `No hay figura seleccionada`;
    return null;
}
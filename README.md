# SanRomanMelanie_1
Trabajo practico entregable numero 1, Interfaces de usuario e interacción. Tres Arroyos 2025 - TUDAI

# 🖌️ Generador Interactivo de Figuras

Este proyecto es una aplicación interactiva construida con HTML5 Canvas y JavaScript, que permite generar, mover y seleccionar distintas figuras geométricas (rectángulos, círculos, cuadrados y triángulos) de forma dinámica.

## 🚀 Funcionalidades

- ✅ Generar figuras con colores y posiciones al azar.
- ✏️ Mover figuras con el mouse o teclado.
- 🔍 Seleccionar figuras haciendo doble clic.
- 🧽 Limpiar el lienzo.
- ℹ️ Ver instrucciones de uso a través de un modal informativo.

## 🎮 Cómo usar

1. Haz clic en el botón **"GENERAR FIGURAS"** para crear figuras aleatorias.
2. Haz **click y mantenlo apretado sobre una figura** para moverla con el mouse.
3. Haz **doble click sobre una figura** para seleccionarla.
4. Usa las **flechas del teclado** para mover una figura seleccionada.
5. Verás el **nombre de la figura** seleccionada en la parte superior del lienzo.
6. Haz clic en **"LIMPIAR"** para borrar el canvas.
7. Haz click nuevamente en la figura, o en cualquier parte del lienzo para **deseleccionarla**.
8. Presiona la ❌ en la esquina superior del modal para cerrarlo, o vuelve a abrirlo desde el botón inferior izquierdo.

## 🛠️ Tecnologías

- HTML5 + CSS3
- JavaScript
- Canvas API

## 🧱 Estructura del código

El proyecto está construido utilizando **clases JavaScript** para representar las distintas figuras. Cada tipo de figura (como `Rectángulo`, `Círculo`, `Cuadrado` y `Triángulo`) es una clase que **hereda de una superclase llamada `Figura`**.

Esto permite:

- Reutilizar código común como posición, color, contexto de dibujo, etc.
- Aplicar **polimorfismo** con métodos como `draw()` y `contieneCoordenada()`.
- Hacer más sencilla la extensión del sistema para agregar nuevas figuras.

## 📁 Estructura del proyecto

```
📦 proyecto
 ┣ 📜 index.html
 ┣ 📂 css
 ┃ ┗ 📜 style.css
 ┣ 📂 js
 ┃ ┣ 📜 comportamiento.js
 ┃ ┣ 📜 Figura.js (superclase Figura)
 ┃ ┣ 📜 Rectangulo.js
 ┃ ┣ 📜 Circulo.js
 ┃ ┣ 📜 Cuadrado.js
 ┃ ┗ 📜 Triangulo.js
 ┗ 📸 vista_previa.png
```

## 🧠 Detalles técnicos

- Soporta hasta 40 figuras.
- Los círculos y cuadrados se generan en pares con colores complementarios.
- Detección precisa de selección usando coordenadas relativas al canvas.

## 📸 Vista previa

> _Proyecto en acción._
![Vista previa de la aplicación](vista_previa.png)


## 💡 Créditos

Desarrollado por Melanie San Román ✨

---

¡Gracias por usar esta herramienta! 🖌️
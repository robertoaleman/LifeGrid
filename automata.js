const canvas = document.getElementById('automataCanvas');
const ctx = canvas.getContext('2d');
const ancho = 150;
const alto = 150;
canvas.width = ancho;
canvas.height = alto;
let celdas = [];

function inicializarCeldas() {
    for (let y = 0; y < alto; y++) {
        celdas[y] = [];
        for (let x = 0; x < ancho; x++) {
            celdas[y][x] = Math.round(Math.random());
        }
    }
}

function obtenerEstado(x, y) {
    if (x < 0 || x >= ancho || y < 0 || y >= alto) {
        return 0;
    }
    return celdas[y][x];
}

function aplicarReglas(vecindad) {
    const sumaVecinos = vecindad.flat().reduce((a, b) => a + b, 0);
    if (vecindad[1][1]) {
        return (sumaVecinos === 3 || sumaVecinos === 4) ? 1 : 0;
    } else {
        return (sumaVecinos === 3) ? 1 : 0;
    }
}

function generarSiguienteGeneracion() {
    const nuevaGeneracion = [];
    for (let y = 0; y < alto; y++) {
        nuevaGeneracion[y] = [];
        for (let x = 0; x < ancho; x++) {
            const vecindad = [
                [obtenerEstado(x - 1, y - 1), obtenerEstado(x, y - 1), obtenerEstado(x + 1, y - 1)],
                [obtenerEstado(x - 1, y), obtenerEstado(x, y), obtenerEstado(x + 1, y)],
                [obtenerEstado(x - 1, y + 1), obtenerEstado(x, y + 1), obtenerEstado(x + 1, y + 1)]
            ];
            nuevaGeneracion[y][x] = aplicarReglas(vecindad);
        }
    }
    celdas = nuevaGeneracion;
}

function dibujarCeldas() {
    ctx.clearRect(0, 0, ancho, alto);
    for (let y = 0; y < alto; y++) {
        for (let x = 0; x < ancho; x++) {
            if (celdas[y][x]) {
                ctx.fillStyle = 'black';
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }
}

function animar() {
    generarSiguienteGeneracion();
    dibujarCeldas();
    requestAnimationFrame(animar);
}

inicializarCeldas();
animar();
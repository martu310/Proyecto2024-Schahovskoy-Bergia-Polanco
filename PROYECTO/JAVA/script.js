var progreso = document.getElementById('progreso');
var intervalo;
var llenando = true; // Variable para controlar si se está llenando la barra
var width = 0; // Variable para almacenar el valor actual de la barra

// Función para llenar o vaciar la barra de progreso
function ajustarBarra() {
    if (llenando) {
        width += 7; // Incrementar el valor de la barra
        if (width >= 100) {
            llenando = false; // Cambiar la dirección cuando alcance el 100%
        }
    } else {
        width -= 7; // Decrementar el valor de la barra
        if (width <= 0) {
            llenando = true; // Cambiar la dirección cuando llegue a 0
        }
    }
    progreso.style.width = width + '%'; // Actualizar el tamaño de la barra
}

// Función para detener el llenado/vaciado de la barra
function detener() {
    clearInterval(intervalo); // Detener la animación
    width = parseInt(progreso.style.width) || 0; // Almacenar el valor actual de la barra
}

// Evento cuando se hace clic en el botón "Parar"
document.getElementById('botonParar').addEventListener('click', detener);

// Iniciar el llenado/vaciado de la barra automáticamente al cargar la página
intervalo = setInterval(ajustarBarra, 50);
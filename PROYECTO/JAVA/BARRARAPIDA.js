var progreso = document.getElementById('progreso');
var intervalo ;
var llenando = true;
var width = 0;
let newton = null ;

//Función para llenar o vaciar la barra de progreso
function ajustarBarra() {
    if (llenando) {
        width += 10; //Se llena mas rapido que la otra
        if (width >= 100) {
            llenando = false;
        }
    } else {
        width -= 10;
        if (width <= 0) {
            llenando = true;
        }
    }
    progreso.style.width = width + '%';
}

//Función para detener el llenado/vaciado de la barra
function detener() {
    clearInterval(intervalo);
    width = parseInt(progreso.style.width) || 0;
    newton = width ;
}

//Evento cuando se hace clic en el botón "Parar"
document.getElementById('botonParar').addEventListener('click', detener);

//Iniciar el llenado/vaciado de la barra automáticamente al cargar la página
intervalo = setInterval(ajustarBarra, 50);

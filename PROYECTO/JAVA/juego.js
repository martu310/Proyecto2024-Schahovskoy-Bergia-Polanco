let board;
let boardwidth = 800;
let boardheight = 600;
let context; //variable para dibujar

//jabalina
let jabawidth = 5;
let jabaheight = 2.5;
let jabax = 15;
let jabay = 80;

// Imagenes para cada momento
let imagJabaSubida;
let imagJabaHor;
let imagJabaCaida;

let jaba = {
    x: jabax,
    y: jabay,
    width: jabawidth,
    height: jabaheight,
    jabaimg: null,
}

//globo
let globowidth = 200;
let globoheight = 300;
let globox = 600;
let globoy = 150;
let globoimag;

let globo = {
    x: globox,
    y: globoy,
    width: globowidth,
    height: globoheight,
}

//Inicializar canvas
window.onload = function() {
    // Inicializa el board
    board = document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d");

    // Inicializa el globo y dibuja le globo en el canva gay
    globoimag = new Image();
    globoimag.src = "../IMAGENES/globo.gif";
    globoimag.onload = function() {
        context.drawImage(globoimag, globo.x, globo.y, globo.width, globo.height);
    }

    // Inicializa cada jabalina
    imagJabaSubida = new Image();
    imagJabaSubida.src = "../IMAGENES/JABALINA_SUBIDA.gif";

    imagJabaHor = new Image();
    imagJabaHor.src = "../IMAGENES/JABALINA_HORIZONTAL.gif";

    imagJabaCaida = new Image();
    imagJabaCaida.src = "../IMAGENES/JABALINA_CAIDA.gif";

    requestAnimationFrame (Actualizar) ;
}


function Actualizar () //funcion que dibuja cada frame
{
    requestAnimationFrame (Actualizar) ;

    lanzar () ;
    
    context.clearRect (0,0,boardwidth,boardheight) ; //borra el frame anterior
}

function lanzar(newton) {
    // Convertir el ángulo de lanzamiento de grados a radianes
    theta=45;
    let rad = theta * Math.PI / 180;

    // Calcular las componentes de la velocidad inicial
    vx = newton * Math.cos(rad); 
    vy = newton* Math.sin(rad); 

    // Actualizar la posición de la jabalina en cada cuadro de animación
    jaba.x += vx;
    jaba.y += vy;

    // Actualizar la velocidad vertical debido a la gravedad
    vy += g;

    // Dibujar la jabalina en su posición actualizada
    context.drawImage(imagJaba1, jaba.x, jaba.y, jaba.width, jaba.height);
}

function calcularAlturaMaxima(newton) {
    const g = 10; 

    let theta = 45;
    let rad = theta * Math.PI / 180;

    // Calcular la velocidad vertical inicial
    let vy0 = newton * Math.sin(rad);

    // Calcular la altura máxima utilizando la ecuación de la posición vertical en el movimiento parabólico
    let alturaMaxima = (vy0 * vy0) / (2 * g);

    return alturaMaxima;
}

let alturaMaxima = calcularAlturaMaxima(newton);

function checkJabalina() {
    // Calcular la distancia relativa entre la posición actual y la altura máxima
    let distanciaRelativa = Math.abs(jaba.y - alturaMaxima);

    // Definir una distancia umbral para el cambio gradual de la imagen
    let distanciaUmbral = 20; // Ajusta este valor según sea necesario

    if (distanciaRelativa <= distanciaUmbral) {
        // Si la distancia relativa es menor o igual que la distancia umbral,
        // mostrar la imagen horizontal
        context.drawImage(imagJabaHor, jaba.x, jaba.y, jaba.width, jaba.height);
    } else {
        // Si la distancia relativa es mayor que la distancia umbral,
        // mostrar la imagen de subida
        context.drawImage(imagJabaSubida, jaba.x, jaba.y, jaba.width, jaba.height);
    }
}
let board;
let boardwidth = 800;
let boardheight = 600;
let context; //variable para dibujar

//jabalina
let jabawidth = 50;
let jabaheight = 75;
let jabax = 45;
let jabay = 280;

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
let globox = 500;
let globoy = 150;
let globoimag;

let globo = {
    x: globox,
    y: globoy,
    width: globowidth,
    height: globoheight,
}

//HITBOX GLOBO
let hitboxWidth = 30; 
let hitboxHeight = 30;
let hitboxOffsetX = 10;
let hitboxOffsetY = 50;

// Calcula los límites de la hitbox del globo en función de su posición y tamaño
let hitboxLeft = globo.x + hitboxOffsetX;
let hitboxRight = hitboxLeft + hitboxWidth;
let hitboxTop = globo.y + hitboxOffsetY;
let hitboxBottom = hitboxTop + hitboxHeight;

const g = 10; 
let alcance ;
let jabalinaLanzada;
let globoExplota;
let vidas2;
let vidas1;
let vidas0;
let vidasLlenas;

let colisionOcurrida=false;
let colisionVerificada=false;

// Variable para controlar el movimiento vertical del globo
let globoSpeedY = 2; // Velocidad de movimiento vertical del globo

window.onload = function() {
    // Inicializa el board
    board = document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d");

    // Inicializa el globo y dibuja le globo en el canva 
    globoimag = new Image();
    globoimag.src = "../IMAGENES/globo.gif";
    globoimag.onload = function() {
        context.drawImage(globoimag, globo.x, globo.y, globo.width, globo.height);
    }
    
    //inicilaizar jabalina 
    imagJabaSubida = new Image () ;
    imagJabaSubida.src = "../IMAGENES/JABALINA_SUBIDA.gif";    

    //inicializar jabalina horizontal

    imagJabaHor = new Image () ;
    imagJabaHor.src = "../IMAGENES/JABALINA_HORIZONTAL.gif"; 

    //iniclaiar jabalina caida

    imagJabaCaida = new Image () ;
    imagJabaCaida.src = "../IMAGENES/JABALINA_CAIDA.gif"; 

    //inicializar globo explotando
    globoExplota = new Image () ;
    globoExplota.src = "../IMAGENES/GLOBO_EXPLOTA.gif"; 

    //inicilaizar vidas llenas
    vidasLlenas = new Image () ;
    vidasLlenas.src = "../IMAGENES/VIDAS_COMPLETAS.gif";  

    //inicilaizar vidas 2
    vidas2 = new Image () ;
    vidas2.src = "../IMAGENES/VIDAS_2.gif"; 

    //inicilaizar vidas 1
    vidas1 = new Image () ;
    vidas1.src = "../IMAGENES/VIDAS_1.gif";  

    //inicilaizar vidas 0
    vidas0 = new Image () ;
    vidas0.src = "../IMAGENES/VIDAS_0.gif";  

    requestAnimationFrame (Actualizar) ;  
}
let cont=0;
function Actualizar() {
    requestAnimationFrame(Actualizar);

    // Borra el frame anterior
    context.clearRect(0, 0, boardwidth, boardheight);

    if (!colisionOcurrida) {
        context.drawImage(globoimag, globo.x, globo.y, globo.width, globo.height);
    }
    // Dibuja la imagen del globo explotando si ha ocurrido una colisión
    else {
        context.drawImage(globoExplota, globo.x, globo.y, globo.width, globo.height);
    }

    // Mueve el globo en el eje Y
    moverGloboY();

    // Vuelve a dibujar la jabalina
    Parar()
    trayectoria();
    checkJabalina();
    context.drawImage(jaba.jabaimg, jaba.x, jaba.y, jaba.width, jaba.height);
    checkCollision();
}

// Función para mover el globo en el eje Y
function moverGloboY() {
    globo.y += globoSpeedY; // Actualiza la posición vertical del globo
    // Cambia la dirección del globo cuando alcanza los límites del canvas
    if (globo.y <= 0 || globo.y + globo.height >= boardheight) {
        globoSpeedY *= -1;
    }
}

function Parar()
{
    if (newton != null) {
        return true;
    }
}

function checkJabalina() {
    if (!Parar()) {
        jaba.jabaimg = imagJabaSubida; 
    } else {
        if (jaba.x < reach() / 2) {
            jaba.jabaimg = imagJabaSubida; 
        } else {
            jaba.jabaimg = imagJabaCaida; 
        }
    }
}

function reach (){
    alcance = (newton*newton) / g ;
    return alcance;
}

function trayectoria() {
    if (Parar()) {
        let alturaDeseada = 450; 
    
        if (jaba.y >= alturaDeseada)
         {
            jabalinaLanzada = true;
            jaba.y = alturaDeseada;

            if (jaba.x >= globo.x + globo.width / 2 - jaba.width / 2)
                 {
                 jaba.x = globo.x + globo.width / 2 - jaba.width / 2;
                 }
        }           else
                     {
                     jaba.x += 2.5;
                    jaba.y = jabay + -1 * (((-g / (newton * newton)) * (jaba.x * jaba.x) + jaba.x));
                     }
    }
}

function checkCollision() {
    // Calcula los límites de la jabalina
    let jabalinaLeft = jaba.x;
    let jabalinaRight = jaba.x + jaba.width;
    let jabalinaTop = jaba.y;
    let jabalinaBottom = jaba.y + jaba.height;

    // Calcula los límites de la hitbox del globo
    let hitboxLeft = globo.x + hitboxOffsetX;
    let hitboxRight = hitboxLeft + hitboxWidth;
    let hitboxTop = globo.y + hitboxOffsetY;
    let hitboxBottom = hitboxTop + hitboxHeight;

    // Comprueba si hay intersección entre los límites de la jabalina y la hitbox del globo
    if (jabalinaRight > hitboxLeft && jabalinaLeft < hitboxRight && jabalinaBottom > hitboxTop && jabalinaTop < hitboxBottom) {
        document.getElementById("win").style.display = "block";
        document.getElementById("reloadButton").style.display = "block"; // Mostrar el botón
        colisionOcurrida =true;
    }

    if (jabalinaLanzada && ((jaba.x > globo.x + globo.width && jaba.y > globo.y && jaba.y + jaba.height < globo.y + globo.height)||(jaba.y + jaba.height > globo.y + globo.height / 2))) {
        document.getElementById("reloadButton").style.display = "block"; // Mostrar el botón
    }
}

function reloadPage() {
    window.location.reload(); // Recargar la página cuando se hace clic en el botón
}
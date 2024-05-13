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
let colisionOcurrida = false;
let colisionVerificada = false;

window.onload = function() {
    // Inicializa el board
    board = document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d");

    // Inicializa el globo y dibuja le globo en el canvas
    globoimag = new Image();
    globoimag.src = "../IMAGENES/globo.gif";
    globoimag.onload = function() {
        context.drawImage(globoimag, globo.x, globo.y, globo.width, globo.height);
    }

    // Inicializa las imágenes de la jabalina
    imagJabaSubida = new Image();
    imagJabaSubida.src = "../IMAGENES/JABALINA_SUBIDA.gif";

    imagJabaHor = new Image();
    imagJabaHor.src = "../IMAGENES/JABALINA_HORIZONTAL.gif";

    imagJabaCaida = new Image();
    imagJabaCaida.src = "../IMAGENES/JABALINA_CAIDA.gif";

    globoExplota = new Image();
    globoExplota.src = "../IMAGENES/GLOBO_EXPLOTA.gif";
  
    requestAnimationFrame(Actualizar);
}

function Actualizar() {
    requestAnimationFrame(Actualizar);
    context.clearRect(0, 0, boardwidth, boardheight);

    if (!colisionOcurrida) {
        context.drawImage(globoimag, globo.x, globo.y, globo.width, globo.height);
    }
    else {
        context.drawImage(globoExplota, globo.x, globo.y, globo.width, globo.height);
    }

    Parar()
    trayectoria();
    checkJabalina();
    context.drawImage(jaba.jabaimg, jaba.x, jaba.y, jaba.width, jaba.height);
    checkCollision();

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
    let jabalinaLeft = jaba.x;
    let jabalinaRight = jaba.x + jaba.width;
    let jabalinaTop = jaba.y;
    let jabalinaBottom = jaba.y + jaba.height;

    // Comprueba si hay intersección entre los límites de la jabalina y la hitbox del globo
    if (jabalinaRight > hitboxLeft && jabalinaLeft < hitboxRight && jabalinaBottom > hitboxTop && jabalinaTop < hitboxBottom) {
        // Aquí puedes agregar acciones adicionales, como detener el juego, mostrar un mensaje, etc.;
        colisionOcurrida = true; 
        document.getElementById("win").style.display = "block";
        document.getElementById("reloadButton").style.display = "block";
    }
    if (jabalinaLanzada && ((jaba.x > globo.x + globo.width && jaba.y > globo.y && jaba.y + jaba.height < globo.y + globo.height)||(jaba.y + jaba.height > globo.y + globo.height / 2))) {
        colisionVerificada = true;
    }
    if (colisionVerificada) {
        document.getElementById("reloadButton").style.display = "block";
    }
}
function reloadPage() {
    window.location.reload(); // Recargar la página cuando se hace clic en el botón
}
function redirectTo(url) {
    window.location.href = url;
}

// Oculta el botón "Try Again" al principio
document.getElementById("reloadButton").style.display = "none";
document.getElementById("win").style.display = "none";
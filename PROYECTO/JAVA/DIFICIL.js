let board;
let boardwidth = 800;
let boardheight = 600;
let context; //Variable para dibujar

//Jabalina
let jabawidth = 50;
let jabaheight = 75;
let jabax = 45;
let jabay = 280;

//Imagenes para cada momento
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

//Globo
let globowidth = 200;
let globoheight = 300;
let globox = 500;
let globoy = 150;
let globoimag;
let globoExplota;
let globoSpeedY = 3;

let globo = {
    x: globox,
    y: globoy,
    width: globowidth,
    height: globoheight,
}

//Hitbox globo
let hitboxWidth = 30; 
let hitboxHeight = 30;
let hitboxOffsetX = 10;
let hitboxOffsetY = 50;

//Calcula los límites de la hitbox del globo en función de su posición y tamaño
let hitboxLeft = globo.x + hitboxOffsetX;
let hitboxRight = hitboxLeft + hitboxWidth;
let hitboxTop = globo.y + hitboxOffsetY;
let hitboxBottom = hitboxTop + hitboxHeight;

//Contantes de cálculo
const g = 10; 
let alcance ;
let jabalinaLanzada;
let colisionOcurrida=false;
let colisionVerificada=false;

window.onload = function() {
    //Inicializa el board
    board = document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d");

    //Inicializa el globo y dibuja le globo en el canva 
    globoimag = new Image();
    globoimag.src = "../IMAGENES/globo.gif";
    globoimag.onload = function() {
        context.drawImage(globoimag, globo.x, globo.y, globo.width, globo.height);
    }
    
    //Inicializa jabalina 
    imagJabaSubida = new Image () ;
    imagJabaSubida.src = "../IMAGENES/JABALINA_SUBIDA.gif";    

    //Inicializa jabalina horizontal

    imagJabaHor = new Image () ;
    imagJabaHor.src = "../IMAGENES/JABALINA_HORIZONTAL.gif"; 

    //Inicializa jabalina caida

    imagJabaCaida = new Image () ;
    imagJabaCaida.src = "../IMAGENES/JABALINA_CAIDA.gif"; 

    //Inicializa globo explotando
    globoExplota = new Image () ;
    globoExplota.src = "../IMAGENES/GLOBO_EXPLOTA.gif"; 

    requestAnimationFrame (Actualizar) ;  
}

function Actualizar() {
    requestAnimationFrame(Actualizar);

    //Borra el frame anterior
    context.clearRect(0, 0, boardwidth, boardheight);

    if (!colisionOcurrida) {
        context.drawImage(globoimag, globo.x, globo.y, globo.width, globo.height);
    }
    //Dibuja la imagen del globo explotando si ha ocurrido una colisión
    else {
        context.drawImage(globoExplota, globo.x, globo.y, globo.width, globo.height);
    }

    moverGloboY();

    //Vuelve a dibujar la jabalina
    Parar()
    trayectoria();
    checkJabalina();
    context.drawImage(jaba.jabaimg, jaba.x, jaba.y, jaba.width, jaba.height);
    checkCollision();
}

//Función para mover el globo en el eje Y
function moverGloboY() {
    globo.y += globoSpeedY;
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
    //Calcula los límites de la jabalina
    let jabalinaLeft = jaba.x;
    let jabalinaRight = jaba.x + jaba.width;
    let jabalinaTop = jaba.y;
    let jabalinaBottom = jaba.y + jaba.height;

    //Calcula los límites de la hitbox del globo
    let hitboxLeft = globo.x + hitboxOffsetX;
    let hitboxRight = hitboxLeft + hitboxWidth;
    let hitboxTop = globo.y + hitboxOffsetY;
    let hitboxBottom = hitboxTop + hitboxHeight;

    //Comprueba si hay colisión, muestra el boton win y try again
    if (jabalinaRight > hitboxLeft && jabalinaLeft < hitboxRight && jabalinaBottom > hitboxTop && jabalinaTop < hitboxBottom) {
        document.getElementById("win").style.display = "block";
        document.getElementById("reloadButton").style.display = "block";
        colisionOcurrida =true;
    }

    //Si pierde se muestra el boton
    if (jabalinaLanzada && ((jaba.x > globo.x + globo.width && jaba.y > globo.y && jaba.y + jaba.height < globo.y + globo.height)||(jaba.y + jaba.height > globo.y + globo.height / 2))) {
        document.getElementById("reloadButton").style.display = "block";
    }
}

function reloadPage() {
    window.location.reload();
}
function redirectTo(url) {
    window.location.href = url;
}

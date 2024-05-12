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

const g = 10; 
let alcance ;
let jabalinaLanzada;

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


    requestAnimationFrame (Actualizar) ;  
}

function Actualizar() {
    requestAnimationFrame(Actualizar);
    // Borra el frame anterior
    context.clearRect(0, 0, boardwidth, boardheight);

    // Vuelve a dibujar el globo
    context.drawImage(globoimag, globo.x, globo.y, globo.width, globo.height);

    // Vuelve a dibujar la jabalina
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

function checkJabalina()
{
    if(jaba.x + jaba.width == reach()/2 )
    {
        jaba.jabaimg = imagJabaHor;
    } 
    else if(jaba.x + jaba.width < reach()/2 )
    {
        jaba.jabaimg = imagJabaSubida; // Cambiado a imagJabaSubida
    } 
    else if (jaba.x + jaba.width > reach()/2)
    {
        jaba.jabaimg = imagJabaCaida; // Cambiado a imagJabaCaida
    }
}

function reach (){
    alcance = (newton*newton) / g ;
    return alcance;
}

function trayectoria (){
    if(Parar() == true)
        {
            jabalinaLanzada=true;
            jaba.x+=2.5;
            jaba.y = jabay + -1*( ((-g / (newton * newton)) * (jaba.x * jaba.x) + jaba.x));
        }
}
// Define los límites de la hitbox del globo
let hitboxWidth = 30; // Ancho de la hitbox
let hitboxHeight = 130; // Alto de la hitbox
let hitboxOffsetX = 10; // Desplazamiento horizontal de la hitbox desde la posición del globo
let hitboxOffsetY = 50; // Desplazamiento vertical de la hitbox desde la posición del globo

// Calcula los límites de la hitbox del globo en función de su posición y tamaño
let hitboxLeft = globo.x + hitboxOffsetX;
let hitboxRight = hitboxLeft + hitboxWidth;
let hitboxTop = globo.y + hitboxOffsetY;
let hitboxBottom = hitboxTop + hitboxHeight;

function checkCollision() {
    // Calcula los límites de la jabalina
    let jabalinaLeft = jaba.x;
    let jabalinaRight = jaba.x + jaba.width;
    let jabalinaTop = jaba.y;
    let jabalinaBottom = jaba.y + jaba.height;

    // Comprueba si hay intersección entre los límites de la jabalina y la hitbox del globo
    if (jabalinaRight > hitboxLeft && jabalinaLeft < hitboxRight && jabalinaBottom > hitboxTop && jabalinaTop < hitboxBottom) {
        // Aquí puedes agregar acciones adicionales, como detener el juego, mostrar un mensaje, etc.;
        alert("GANASTE");
    }
    if (jabalinaLanzada && ((jaba.x > globo.x + globo.width && jaba.y > globo.y && jaba.y + jaba.height < globo.y + globo.height)||(jaba.y + jaba.height > globo.y + globo.height / 2))) {
        document.getElementById("reloadButton").style.display = "block"; // Mostrar el botón
    }
}
function reloadPage() {
    window.location.reload(); // Recargar la página cuando se hace clic en el botón
}
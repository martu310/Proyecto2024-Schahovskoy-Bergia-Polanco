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
}

function Parar()
{
    if (newton != null) {
        return true;
    }
}

function checkJabalina()
{
    if(jaba.x+jaba.width == reach()/2 )
    {
        jaba.jabaimg = imagJabaHor ;
    } else if(jaba.x+jaba.width < reach()/2 )
    {
        jaba.jabaimg = imagJabaCaida ;
    } else {
        jaba.jabaimg = imagJabaSubida ;
    }

}

function reach (){
    alcance = (newton*newton) / g ;
    return alcance;
}

function trayectoria (){
    if(Parar() == true)
        {
            jaba.x+=1;
            jaba.y = jabay + -1*( ((-g / (newton * newton)) * (jaba.x * jaba.x) + jaba.x));
        }
}

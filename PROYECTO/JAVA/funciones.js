function checkCollision() {
    // Calcula los límites de la jabalina
    let jabalinaLeft = jaba.x;
    let jabalinaRight = jaba.x + jaba.width;
    let jabalinaTop = jaba.y;
    let jabalinaBottom = jaba.y + jaba.height;

    // Comprueba si hay intersección entre los límites de la jabalina y la hitbox del globo
    if (jabalinaRight > hitboxLeft && jabalinaLeft < hitboxRight && jabalinaBottom > hitboxTop && jabalinaTop < hitboxBottom) {
        // Colisión detectada
        console.log("¡Colisión detectada!");
        // Aquí puedes agregar acciones adicionales, como detener el juego, mostrar un mensaje, etc.
        
    }
}

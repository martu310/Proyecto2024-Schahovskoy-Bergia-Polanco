let intentos = localStorage.getItem('intentos') ? parseInt(localStorage.getItem('intentos')) : 0;

function incrementarIntentos() {
    intentos++;
    localStorage.setItem('intentos', intentos);
}

function mostrarIntentos() {
    const winButton = document.getElementById("win");
    const intentosText = document.createElement("p");
    intentosText.id = "intentosText";
    intentosText.textContent = `INTENTOS = ${intentos}`;

    const existingIntentosText = document.getElementById("intentosText");
    if (existingIntentosText) {
        existingIntentosText.remove();
    }

    winButton.parentNode.insertBefore(intentosText, winButton.nextSibling);
}

function reiniciarIntentos() {
    localStorage.removeItem('intentos');
}

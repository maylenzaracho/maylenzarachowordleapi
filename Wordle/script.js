let intentos = 5;
let palabra = "";
//
const diccionario = [ 'CHINO', 'TOROS', 'SECAR', 'PALOMA', 'GATOS', 'OTOÑO', 'LIBRO', 'VERDE', 'LECHE', ];
//
function init() {
    palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
    const button = document.getElementById("guess-button");
    button.addEventListener("click", intentar);
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
//
fetch('https://random-word-api.herokuapp.com/word?length=5&lang=es')
 	.then(response => response.json())
 	.then(response => {
         console.log(response)
         palabra = response[0].toUpperCase()
     })
 	.catch(err => console.error(err));

//
    intentos = 5;
// 
    const input = document.getElementById("guess-input");
    input.value = "";
    input.disabled = false;
    button.disabled = false;

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") { intentar(); }
    });
//
    const guesses = document.getElementById('guesses');
    guesses.innerHTML = "";
}
//
function intentar() {
    const input = document.getElementById("guess-input");
    const PROBAR = leerIntento();
// 
    if (PROBAR === palabra) {
        terminar("<h2>Muy bien!!💕</h2>");
        return;
    }
 // 
    const grid = document.getElementById("grid");
    const row = document.createElement('div');
    row.className = 'row';
// 
    for (let i = 0; i < PROBAR.length; i++) {
        const span = document.createElement('span');
        span.className = 'letter';
        span.style.borderRadius = '5px';
        span.style.border = 'none';
        span.style.padding = '10px';

        if (PROBAR[i] === palabra[i]) { 
            span.innerHTML = PROBAR[i];
            span.style.backgroundColor = '#79b851';
            span.style.color = '#344e41';
        } else if (palabra.includes(PROBAR[i])) { 
            span.innerHTML = PROBAR[i];
            span.style.backgroundColor = '#f3c237';
            span.style.color = '#fb8500';
        } else { 
            span.innerHTML = PROBAR[i];
            span.style.backgroundColor = '#edede9';
            span.style.color = '#d6ccc2';
        }
     row.appendChild(span);
    }

//
    grid.appendChild(row);
// 
    intentos--;
//
    if (intentos === 0) {
        terminar("<h2>opps.. i did it again</h2>");
    }
//
    input.value = "";
}
//
function leerIntento() {
    const input = document.getElementById("guess-input");
    let intento = input.value;
    intento = intento.toUpperCase();
    return intento;
}
// 
function terminar(mensaje) {
    const popup = document.getElementById("opa");
    const popupMessage = document.getElementById("hello");
    const reloadButton = document.getElementById("reload-button");
    const answer = document.getElementById("correct-answer");

    answer.innerHTML = `la palabra era: ${palabra}`;
    popupMessage.innerHTML = mensaje;
    popupMessage.style.fontSize = '20px';
    popup.style.display = "flex";

    reloadButton.addEventListener("click", function () {
        location.reload();
    });
}

// Agregar un event listener "load" para inicializar el juego
window.addEventListener('load', init);


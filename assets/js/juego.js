/*
 */

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0,
  puntosComputadora = 0;

// Referencias del HTML
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");
const puntosHTML = document.querySelectorAll("small");

// Esta funcion crea un nueva baraja
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  // console.log(deck);
  deck = _.shuffle(deck);
  return deck;
};

crearDeck();

// Esta funcion me permite tomar una carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No Hay cartas en el deck";
  }

  const carta = deck.pop();
  return carta;
};

// pedirCarta();
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

// Turno de la logica de la computadora

const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerHTML = puntosComputadora;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    divCartasComputadora.append(imgCarta);
    imgCarta.classList.add("carta");

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
};

// Eventos
btnPedir.addEventListener("click", function () {
  const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta(carta);
  puntosHTML[0].innerHTML = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  divCartasJugador.append(imgCarta);
  imgCarta.classList.add("carta");

  if (puntosJugador > 21) {
    console.warn("Lo siento mucho, perdiste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21, genial!");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;

  turnoComputadora(puntosJugador);
});

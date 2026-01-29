const miModulo = (() => {
  "use strict";
  let e = [],
    t = ["C", "D", "H", "S"],
    a = ["A", "J", "Q", "K"],
    r = [],
    l = document.querySelector("#btnPedir"),
    n = document.querySelector("#btnDetener"),
    s = document.querySelector("#btnNuevo"),
    o = document.querySelectorAll(".divCartas"),
    d = document.querySelectorAll("small"),
    i = (t = 2) => {
      ((e = c()), (r = []));
      for (let a = 0; a < t; a++) r.push(0);
      (d.forEach((e) => (e.innerText = 0)),
        o.forEach((e) => (e.innerHTML = "")),
        (l.disabled = !1),
        (n.disabled = !1));
    },
    c = () => {
      e = [];
      for (let r = 2; r <= 10; r++) for (let l of t) e.push(r + l);
      for (let n of t) for (let s of a) e.push(s + n);
      return _.shuffle(e);
    },
    u = () => {
      if (0 === e.length) throw "No Hay cartas en el deck";
      return e.pop();
    },
    $ = (e) => {
      let t = e.substring(0, e.length - 1);
      return isNaN(t) ? ("A" === t ? 11 : 10) : 1 * t;
    },
    p = (e, t) => ((r[t] = r[t] + $(e)), (d[t].innerHTML = r[t]), r[t]),
    f = (e, t) => {
      let a = document.createElement("img");
      ((a.src = `assets/cartas/${e}.png`),
        a.classList.add("carta"),
        o[t].append(a));
    },
    h = () => {
      let e = r[0],
        t = r[r.length - 1];
      setTimeout(() => {
        t === e
          ? alert("Empate, nadie gana.")
          : e > 21
            ? alert(`Computadora gana (${t} pts). \xa1Suerte la pr\xf3xima!`)
            : t > 21
              ? alert(`\xa1Ganaste! La computadora se pas\xf3 con ${t} pts.`)
              : t > e
                ? alert(`Computadora gana con ${t} pts.`)
                : alert(`\xa1Felicidades! Ganaste con ${e} pts.`);
      }, 500);
    },
    b = (e) => {
      let t = 0;
      do {
        let a = u(),
          l = r.length - 1;
        ((t = p(a, l)), f(a, l));
      } while (t < e && e <= 21);
      h();
    };
  return (
    l.addEventListener("click", function () {
      let e = u(),
        t = p(e, 0);
      (f(e, 0),
        t > 21
          ? (console.warn("Lo siento mucho, perdiste"),
            (l.disabled = !0),
            (n.disabled = !0),
            b(t))
          : 21 === t &&
            (console.warn("21, genial!"),
            (l.disabled = !0),
            (n.disabled = !0),
            b(t)));
    }),
    n.addEventListener("click", () => {
      ((l.disabled = !0), (n.disabled = !0), b(r[0]));
    }),
    s.addEventListener("click", () => {
      i();
    }),
    { nuevoJuego: i }
  );
})();

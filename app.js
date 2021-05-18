let playerOnesTurn = true;

document.addEventListener(
  "click",
  function (event) {
    if (!event.target.matches(".tile")) return;

    event.preventDefault();
    if (playerOnesTurn && !event.target.classList.contains("o")) {
      event.target.classList.add("x");
      playerOnesTurn = !playerOnesTurn;
    } else if (!playerOnesTurn && !event.target.classList.contains("x")) {
      event.target.classList.add("o");
      playerOnesTurn = !playerOnesTurn;
    }
    document.querySelector('.red').classList.toggle('invis');
    document.querySelector('.blue').classList.toggle('invis');
  },
  false
);

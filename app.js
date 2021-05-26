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
    document.querySelector(".red").classList.toggle("invis");
    document.querySelector(".blue").classList.toggle("invis");
  },
  false
);

// win condition is when either class name "x" or "o" is found on 3 consecutive divs
// 8 directions: horiz top, horiz mid, horiz bot, vert left, vert mid, vert right, diag up, & diag down

/*
  [a][b][c]
  [d][e][f]
  [g][h][i]
*/

const winners = new Set([
  "abc",
  "def",
  "ghi",
  "aei",
  "ceg",
  "adg",
  "beh",
  "cfi",
]);

const redClicked = [];
const blueClicked = [];

function tally(key) {
  if (playerOnesTurn) {
    redClicked.push(key.getAttribute("id"));
  } else {
    blueClicked.push(key.getAttribute("id"));
  }
  // console.log(key.getAttribute("id"));
  let result = checkIfWon();
  if (result) {
    document.getElementsByClassName("board")[0].innerHTML = `${result} wins!`
  }
}

function checkIfWon() {
  redClicked.sort();
  blueClicked.sort();
  const redTrios = createTrios(redClicked);
  const blueTrios = createTrios(blueClicked);
  console.log("red trios: ", redTrios);
  console.log("blue trios: ", blueTrios);
  for (let i = 0; i < redTrios.length; i++) {
    if (winners.has(redTrios[i])) return "Red";
  }
  for (let i = 0; i < blueTrios.length; i++) {
    if (winners.has(blueTrios[i])) return "Blue";
  }
  return false;
}

function createTrios(arr) {
  if (arr.length < 3) return [];
  const output = [];
  function permute(array, str) {
    if (str.length === 3) {
      output.push(str);
      return;
    }
    for (let i = 0; i < array.length; i++) {
      let letter = array.splice(i, 1);
      permute(array, str + letter);
      array.splice(i, 0, letter);
    }
  }
  permute(arr, "");
  return output;
}

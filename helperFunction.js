
function checkColumnFull() {
  const square = document.querySelector("#square-0-0")
  const column = document.querySelector("#column-0")

  // console.log(square.classList.value)
  if (square.classList.value.includes("full")) {
    column.classList.add("full")
  }
}


function placeTokenInSquare() {
  const square = document.querySelector("#square-5-6");
  let tokenDiv = document.createElement("div");
  if (whoseTurn() % 2 === 0) {
    tokenDiv.classList.add("token", "red");
  } else {
    tokenDiv.classList.add("token", "black");
  }
  square.appendChild(tokenDiv);
}
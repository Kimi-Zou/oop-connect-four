import Game from './game.js'

let game = undefined;
const clickTargets = document.querySelector("#click-targets");

function updateUI () {
    const boardHolder = document.querySelector("#board-holder")
    // When we haven't started a new game, click targets is invisible
    if(game === undefined){
        boardHolder.classList.add("is-invisible");
    } else {

      // Makes the click targets visible 
      boardHolder.classList.remove("is-invisible");
      // Adds game name
        document.querySelector("#game-name").innerHTML = game.getName();
    }

    // Place tokens into the square of the game board (with color)
    for(let rowNum = 0; rowNum < 6; rowNum++){
      for(let colNum = 0; colNum < 7; colNum++){
        let square = document.querySelector(`#square-${rowNum}-${colNum}`);
        let selectedSquare = game.getTokenAt(rowNum, colNum);
        square.innerHTML = "";
        let token = document.createElement("div");
        if(selectedSquare === 1){
          token.classList.add("token", "black");
        } else if (selectedSquare === 2){
          token.classList.add("token", "red");
        }
        square.appendChild(token);
      }
    }

    // Checks if column is full; change appearance of mouse; cannot add token
    for (let colIndex = 0; colIndex < 7; colIndex++) {
      let selectedColumn = document.getElementById(`column-${colIndex}`);
      if (game.isColumnFull(colIndex)) {
        selectedColumn.classList.add('full');
      } else {
        selectedColumn.classList.remove('full');
      }
    }

    // Switches token color:  black for player1, red for player2
    if(game.playerTurn === 1){
        clickTargets.classList.add("black")
        clickTargets.classList.remove("red")
    } else {
        clickTargets.classList.add("red")
        clickTargets.classList.remove("black")
    }
}

window.addEventListener('DOMContentLoaded', event => {
  let playerOne = document.getElementById('player-1-name');
  let playerTwo = document.getElementById('player-2-name');
  let newGameBtn = document.getElementById('new-game');
  
  // Enables the "NEW GAME" button, when text fields filled out
  document
    .getElementById('form-holder')
    .addEventListener('keyup', event => {
      if (playerOne.value !== '' && playerTwo.value !== '') {
        newGameBtn.disabled = false;
      } else {
        newGameBtn.disabled = true;
      }
    });

    // Button click:  initializes new game
    document.getElementById('new-game')
      .addEventListener('click', event => {
        game = new Game(playerOne.value, playerTwo.value);
        playerOne.value = '';
        playerTwo.value = '';
        newGameBtn.disabled = true;

        // Update UI
        updateUI();
      });

    // 
    clickTargets.addEventListener("click", event => {
      let targetID = event.target.id;
      if (targetID.startsWith('column-')) {
        let columnNum = Number.parseInt(targetID[targetID.length - 1]);

        // Places player token at top of column (red or black)
        // Drops the token
        game.playInColumn(columnNum);
      }
        // Update UI
        updateUI();
    })
});

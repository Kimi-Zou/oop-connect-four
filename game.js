import Column from "./column.js" 
import ColumnWinInspector from './column-win-inspector.js';
import RowWinInspector from './row-win-inspector.js';

// Gets names from form fields; determines player turn (1); sets up game board
export default class Game {
  constructor(player1, player2) {
    this.name1 = player1;
    this.name2 = player2;
    this.playerTurn = 1;
    this.winnerNumber = 0;
    this.columns = [
      new Column(),
      new Column(),
      new Column(),
      new Column(),
      new Column(),
      new Column(),
      new Column()
    ]
  }

  // Sets name of game (based on player names)
  // If game is a tie, display tie message
  getName() {
    if(this.winnerNumber === 3){
      return `${this.name1} ties with ${this.name2}!`;
    } else if (this.winnerNumber === 2) {
      return `${this.name2} wins!`;
    } else if (this.winnerNumber === 1) {
      return `${this.name1} wins!`;
    } else {
      return `${this.name1} vs. ${this.name2}`;
    }
  }

  playInColumn(columnNum) {
      // Sets selected column to player whose turn it is
      // Place token to the selected column's empty square 
      let selectedColumn = this.columns[columnNum];
      selectedColumn.add(this.playerTurn);

      //Switches turn to opposite player
      if(this.playerTurn === 1){
          this.playerTurn = 2;
      } else {
          this.playerTurn = 1;
      }

      // Check for tie
      this.checkForTie();

      if (this.winnerNumber === 0) {
        this.checkForColumnWin();
      }
  }

  //If all columns are full, updates winner number to 3
  checkForTie(){
    // for (let colIndex = 0; colIndex < 7; colIndex++) {
    //   if(this.columns[colIndex].isFull()){
    //     this.winnerNumber = 3;
    //   }
    // }
    let columnIsFull = this.columns.every(column=>{
      return column.isFull();
    })
    if(columnIsFull){
      this.winnerNumber = 3;
    }
  }
  
  // Checks if column is full; return true or false
  isColumnFull(colIndex) {
    if (this.winnerNumber === 1 || this.winnerNumber === 2) {
      return true;
    }
    return this.columns[colIndex].isFull();
  }

  // Returns square's value (1 or 2)
  getTokenAt(rowIndex, colIndex){
    let selectedColumn = this.columns[colIndex];
    return selectedColumn.getTokenAt(rowIndex);
  }

  // Check if there are 4 contiguous same-colored tokens in a column
  // Return player num or 0
  checkForColumnWin() {
    for (let column = 0; column < this.columns.length; column++) {
      // KIMI: this.columns[column] is one of the new Column() in this.columns
      let inspector = new ColumnWinInspector(this.columns[column]);
      let winner = inspector.inspect()
      
      if (winner === 1 || winner === 2) {
        this.winnerNumber = winner;
        break;
      }
    }
  }
}

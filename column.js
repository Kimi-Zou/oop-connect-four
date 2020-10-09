 export default class Column { 
  constructor() {
    //Token value: empty => null; player1 => 1; player2 => 2
    this.tokens = [ null, null, null, null, null, null ];
    this.numberOfTokens = 0;
  }
  
  //playerNumber => game.playerTurn => value 1 or 2
  //Updates this.tokens and this.numberOfTokens
  add(playerNumber) {
    for (let i = this.tokens.length - 1; i >= 0 ; i--) {
      if (this.tokens[i] === null) {
        this.tokens[i] = playerNumber;
        this.numberOfTokens += 1;
        break;
      }
    }
  }

  //Check if column is full => this.tokens doesn't have empty square/null
  isFull() {
    return this.numberOfTokens === 6
  }

  //It returns value 1 or 2 or null in the this.tokens array 
  getTokenAt(index) {
    return this.tokens[index];
  }
}

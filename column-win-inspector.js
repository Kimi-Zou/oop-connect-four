export default class ColumnWinInspector {
  constructor(column) {
    this.column = column; 
    }
  

  // Check if there are 4 contiguous same-colored tokens in a column
  // Return player num or 0
  inspect() {
    for (let i = 0; i < this.column.tokens.length - 3; i++) {
      if (
        this.column.tokens[i] === this.column.tokens[i + 1] && 
        this.column.tokens[i + 1] === this.column.tokens[i + 2] && 
        this.column.tokens[i + 2] === this.column.tokens[i + 3] && 
        this.column.tokens[i + 3] !== null
      ) {
        return this.column.tokens[i];
      }
    }
    return 0;
  }
}

// NOTE THE ORIGIN OF THE GRID IS TOP LEFT

export default class Grid {
  constructor() {
    this.colors = ['blue', 'orange', 'red', 'black', 'teal'];
    this.squares = this.initSquares();
  }
  initSquares() {
    let grid = [...Array(5)].map(x => Array(5).fill(0));
    this.colors.forEach((color, i) => {
      let x = i;
      for (let y = 0; y < 5; y++) {
        grid[y][x] = { color, filled: false };
        x = x < 4 ? x + 1 : 0;
      }
    });
    return grid;
  }

  addTile(row, color) {
    const col = this.squares[row].indexOf(color);
    let score = 1;
    checkAbove(row, col);
    checkBelow(row, col);
    checkLeft(row, col);
    checkRight(row, col);

    return score;

    function checkAbove(row, col) {
      if (row - 1 < 0) return;
      else if (this.squares[row - 1][col].filled) {
        score++;
        checkAbove(row - 1, col);
      }
    }
    function checkBelow(row, col) {
      if (row + 1 > 4) return;
      else if (this.squares[row + 1][col].filled) {
        score++;
        checkBelow(row + 1, col);
      }
    }
    function checkLeft(row, col) {
      if (col - 1 < 0) return;
      else if (this.squares[row][col - 1].filled) {
        score++;
        checkLeft(row, col - 1);
      }
    }
    function checkRight(row, col) {
      if (col + 1 > 4) return;
      else if (this.squares[row][col + 1].filled) {
        score++;
        checkRight(row, col + 1);
      }
    }
  }
  scoreBonuses() {
    let bonusScore = 0;

    // Check for 5 of same color
    this.colors.map(color => {
      bonusScore +=
        this.squares.flat().filter(square => square.color === color && filled)
          .length === 5
          ? 10
          : 0;
    });

    // check for 5 in a row
    bonusScore += this.numRowsComplete() * 2;

    //check for 5 in a column
    for (let row = 0; row < 5; row++) {
      let isColFilled = true;
      for (let col = 0; col < 5; col++) {
        isColFilled = isColFilled && this.squares[row][col].filled;
      }
      if (isColFilled) bonusScore += 7;
    }

    return bonusScore;
  }

  numRowsComplete() {
    let rowsComplete = 0;
    this.squares.map(row => {
      if (row.reduce((acc, square) => acc && square.filled, true))
        rowsComplete++;
    });
  }
}

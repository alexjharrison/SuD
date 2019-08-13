export default class Grid {
  constructor() {
    this.squares = this.initSquares();
  }
  initSquares() {
    let grid = [...Array(5)].map(x => Array(5).fill(0));

    ['blue', 'orange', 'red', 'black', 'teal'].forEach((color, i) => {
      let x = i;
      for (let y = 0; y < 5; y++) {
        console.log({ x, y });
        grid[y][x] = { color, filled: false };
        x = x < 4 ? x + 1 : 0;
      }
    });
    console.log(grid);
    return grid;
  }
}

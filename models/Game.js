import Tile from './Tile';

export default class Game {
  constructor(boards) {
    this.tiles = this.createTiles();
  }
  createTiles() {
    const red = Array(20).fill(new Tile('red'));
    const blue = Array(20).fill(new Tile('blue'));
    const teal = Array(20).fill(new Tile('teal'));
    const orange = Array(20).fill(new Tile('orange'));
    const black = Array(20).fill(new Tile('black'));
    const one = new Tile('one');
    return [...red, ...blue, ...teal, ...orange, ...black, one];
  }
}

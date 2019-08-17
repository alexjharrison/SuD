import Tile from './Tile';
import Board from './Board';

export default class Game {
  constructor() {
    // generate tiles
    this.allTiles = this.createTiles();

    //tile locations
    this.bag = [...this.allTiles];
    this.circles = [[], [], [], [], []];
    this.pot = [new Tile('one', 101)];
    this.discard = [];

    // game status
    this.players = [];
    this.turn = 0;
    this.selectedTileId = null;
    this.isLastRound = false;
  }

  // load tiles onto circles from bag
  populateCircles() {
    this.shuffleTiles();
    this.circles.map(tileArr => {
      tileArr.push(this.bag.pop());
      tileArr.push(this.bag.pop());
      tileArr.push(this.bag.pop());
      tileArr.push(this.bag.pop());
    });
  }

  // Shuffle array of tile objects
  shuffleTiles() {
    for (let i = this.bag.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]]; // swap elements
    }
  }

  // Refill bag from tiles in discard
  refillBag() {
    this.bag = [...this.discard];
    this.discard = [];
  }

  // Add player to game, add more circles, max at 4
  addPlayer(name) {
    if (this.players.length === 4) return null;
    else if (this.players.length >= 2) this.circles.push([], []);
    this.players.push(new Board(name));
    return this.players.length - 1;
  }

  // Instantiate all tiles
  createTiles() {
    let arr = [];
    for (let i = 0; i < 100; i++) {
      const color =
        i <= 20
          ? 'red'
          : i <= 40
          ? 'blue'
          : i <= 60
          ? 'teal'
          : i <= 80
          ? 'orange'
          : 'black';
      arr.push(new Tile(color, i));
    }
    return arr;
  }
}

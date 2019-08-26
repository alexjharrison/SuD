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
    this.winner = null;
  }

  //////// Front End Requests ////////////

  // Add player to game, add more circles, max at 4
  addPlayer(name) {
    const numPlayers = this.players.length;
    if (numPlayers === 4) return;
    else if (numPlayers >= 2) this.circles.push([], []);
    this.players.push(new Board(name, numPlayers));
  }

  // Player picked tile from circle or pot
  tilePicked({ playerNum, tileId }) {
    // if (playerNum !== this.turn) return;
    this.selectedTileId = tileId;
  }

  // player placed tile into a row
  tilePlaced({ playerNum, rowId }) {
    // incrementTurn
    this.turn++;
    if (this.turn === this.players.length) this.turn = 0;

    // get tile color
    const selectedTile = this.allTiles.filter(
      ({ id }) => id === this.selectedTileId
    )[0];
    const color = selectedTile.color;

    // find circle index of tile
    let circleIdx = null;
    this.circles.map((tiles, i) => {
      tiles.map(({ id }) => {
        if (this.selectedTileId === id) circleIdx = i;
      });
    });

    // tile in circle
    const playerBoard = this.players[playerNum];
    if (typeof circleIdx === 'number') {
      const relatedTiles = this.circles[circleIdx].filter(
        tile => tile.color === color
      );
      const unrelatedTiles = this.circles[circleIdx].filter(
        tile => tile.color !== color
      );

      //push unrelated tiles to pot
      unrelatedTiles.map(tile => this.pot.push({ ...tile }));

      // push related tiles to player board
      relatedTiles.map(tile => {
        const overflowTile = playerBoard.tilePlayed(tile, rowId);
        if (overflowTile) this.discard.push(overflowTile);
      });

      //empty circle
      this.circles[circleIdx] = [];
    }
    // tile in pot
    else {
      const relatedTiles = this.pot.filter(tile => tile.color === color);
      if (this.pot[0].color === 'one') {
        relatedTiles.push(this.pot[0]);
        this.pot = this.pot.filter(({ color }) => color !== 'one');
      }

      // push related tiles to player board
      relatedTiles.map(tile => {
        const overflowTile = playerBoard.tilePlayed(tile, rowId);
        if (overflowTile) this.discard.push(overflowTile);
      });

      // remove tile color from pot
      this.pot = this.pot.filter(tile => tile.color !== color);
    }

    // check if round ended / calcuate board scores & reset
    const tilesInCircles = this.circles.reduce(
      (acc, tiles) => acc + tiles.length,
      0
    );
    if (tilesInCircles + this.pot.length === 0) {
      this.players.forEach(board => {
        this.discard.concat(board.roundEnd());
      });
      this.populateCircles();
    }

    // check if game ended / calculate bonus
    if (this.isGameOver()) {
      this.players.map(board => board);
    }

    // calculate winner
    this.winner = this.players.reduce(
      (winrar, player) => {
        if (player.score > winrar) return player;
      },
      [{ score: -1 }]
    );

    //reset selected tile
    this.selectedTileId = null;
  }

  ////////  Pure Game Logic  //////////////

  // load tiles onto circles from bag
  populateCircles() {
    this.shuffleTiles();
    this.circles = this.circles.map(() => []);
    this.circles.map(tileArr => {
      tileArr.push(this.bag.pop());
      tileArr.push(this.bag.pop());
      tileArr.push(this.bag.pop());
      tileArr.push(this.bag.pop());
    });
  }

  // determine if the game is over
  isGameOver() {
    return this.players.reduce(
      (acc, board) => acc || board.isGameOver(),
      false
    );
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

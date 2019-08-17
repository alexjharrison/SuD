export default class PenaltyRow {
  constructor() {
    this.slots = new Array(7).fill('').map((val, i) => ({
      points: Math.floor((i + 4) / 3) * -1,
      tile: null
    }));
  }
  score() {
    return this.slots.reduce((acc, tile) => (tile.tile ? acc + 1 : acc), 0);
  }
  reset() {
    // remove tile from slot
    this.slots = new Array(7).fill('').map((val, i) => ({
      points: Math.floor((i + 4) / 3) * -1,
      tile: null
    }));
  }
  addTile(tile) {
    for (let i = 0; i < this.slots.length; i++) {
      if (!this.slots[i].tile) {
        this.slots[i].tile = tile;
        break;
      }
    }
  }
}

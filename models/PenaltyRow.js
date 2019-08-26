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
    const tiles = this.slots.map(({ tile }) => tile);
    // remove tile from slot
    this.slots = new Array(7).fill('').map((val, i) => ({
      points: Math.floor((i + 4) / 3) * -1,
      tile: null
    }));
    return tiles;
  }
  addTile(tile) {
    // all slots full
    if (this.slots[this.slots.length - 1].tile) {
      return tile;
    }

    // put in next available slot
    for (let i = 0; i < this.slots.length; i++) {
      if (!this.slots[i].tile) {
        this.slots[i].tile = tile;
        return null;
      }
    }
  }
}

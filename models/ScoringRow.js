export default class ScoringRow {
  constructor(length) {
    this.slots = Array(length).fill(null);
  }

  // Resets all slots in row to empty
  reset() {
    this.slots = this.slots.map(null);
  }

  // returns true or false if row is completed
  isCompleted() {
    return this.slotsFilled === this.slots.length;
  }

  // number of slots filled in row
  slotsFilled() {
    return this.slots.reduce((acc, tile) => (tile ? acc + 1 : acc), 0);
  }

  // return current color allowed in row or null
  currentColor() {
    if (!this.slots[0]) {
      return null;
    }
    return this.slots[0].color;
  }

  addTile(tile) {
    // return null if slots are filled or incorrect color
    const slotsFilled = this.slotsFilled();
    const color = this.currentColor();
    if (this.currentColor()) {
      if (slotsFilled === this.slots.length || color !== tile.color)
        return tile;
    }

    // place tile into first null slot
    for (let i = 0; i < this.slots.length; i++) {
      if (!this.slots[i]) {
        this.slots[i] = tile;
        break;
      }
    }
    return null;
  }
}

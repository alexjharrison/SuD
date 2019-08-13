export default class Tile {
  constructor(color) {
    this.color = color;
    this.id = Tile.incrementId();
    this.selectable = false;
    this.location = 'bag';
  }
  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }
}

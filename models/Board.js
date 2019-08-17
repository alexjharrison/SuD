import Grid from './Grid';
import ScoringRow from './ScoringRow';
import PenaltyRow from './PenaltyRow';

export default class Board {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.score = 0;
    this.grid = new Grid();
    this.scoringRows = [1, 2, 3, 4, 5].map(slots => new ScoringRow(slots));
    this.penaltyRow = new PenaltyRow();
  }

  // if row entered is null, goes straight to trash
  tilePlayed(tile, row) {
    if (row) {
      const extraTile = this.scoringRows[row].addTile(tile);
      if (extraTile) this.penaltyRow.addTile(tile);
    } else {
      this.penaltyRow.addTile(tile);
    }
  }
  roundEnd() {
    // get rows that are complete
    const finishedRows = this.scoringRows.filter(row => row.slotsFilled());

    // progressively score each row into the grid
    let score = finishedRows.reduce((acc, row, idx) => {
      const rowColor = row.currentColor();
      const gridScore = this.grid.addTile(idx, rowColor);
      row.reset();
      return acc + gridScore;
    }, 0);

    // subtract penalties
    score += this.penaltyRow.score();
    this.penaltyRow.reset();

    this.score = score;
  }
  isGameOver() {
    return this.grid.numRowsComplete > 0;
  }
}

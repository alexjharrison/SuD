import {} from './events';
import Grid from './models/Grid';
const express = require('express');
const app = express();

const grid = new Grid();
console.log(grid.squares);

app.use(express.static('public'));
app.listen(8080, console.log('Started on port 8080'));

import {} from './events';
import Grid from './models/Grid';
const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.port;

const grid = new Grid();
console.log(grid.squares);

app.use(express.static('./client/dist'));
app.listen(PORT, console.log('Started on port ' + PORT));

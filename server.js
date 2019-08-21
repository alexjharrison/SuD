import Game from './models/Game';
import socket from './socket';

const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// init game parameters
const game = new Game();
game.addPlayer('Alex');
game.addPlayer('Ally');
game.addPlayer('Bill');
game.addPlayer('Fred');
game.players[0].grid.squares[0][0].filled = true;
game.players[0].grid.squares[1][0].filled = true;
game.players[0].grid.squares[2][0].filled = true;
game.players[0].grid.squares[3][0].filled = true;
game.players[0].grid.squares[4][0].filled = true;
game.players[1].grid.squares[1][2].filled = true;
game.players[2].grid.squares[4][4].filled = true;
game.players[3].grid.squares[4][0].filled = true;

// start server and host built vue files
app.use(express.static('./client/dist'));
const server = app.listen(PORT, console.log('Started on port ' + PORT));

// hook sockets into server
socket(server, game);

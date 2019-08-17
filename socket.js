const socket = require('socket.io');

export default (server, game) => {
  const io = socket(server);
  io.on('connection', function() {
    console.log(game);
    io.emit('UPDATE_GAME', game);
  });
};

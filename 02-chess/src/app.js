import config from './config';
import $ from 'jquery';
import ChessBoard from 'chessboardjs';
import Chess from 'chess.js';
import io from 'socket.io-client';

window.$ = $;

/* ---------------------------
Game
--------------------------- */

const game = new Chess.Chess();

const cfg = {
  draggable: true,
  position: 'start',
  onDrop: makeMove,
  orientation: 'black',
};

const board = ChessBoard('board', cfg);

/* ---------------------------
Websocket
--------------------------- */

const socket = io(config.SERVER_URL);

$('#joinGameBtn').on('click', () => {
  const gameID = prompt('Please enter a game id:');
  if (gameID.match(/[a-zA-Z0-9]{8}/)) {
    $('#gameID').text(gameID);
    socket.emit('join game', {
      game: gameID,
    });
    return false;
  } else {
    alert("Please enter a valid game id!");
  }
});

$('#newGameBtn').on('click', () => {
  socket.emit('new game');
  return false;
});

$('#restartGameBtn').on('click', () => {
  socket.emit('restart');
  board.start(true);
  return false;
});

socket.on('game created', (data) => {
  $('#gameID').text(data.game.id);
})

socket.on('game started', () => {
  console.log("Game started!")
})

socket.on('game joined', (data) => {
  board.position(data.game.fen);
})

socket.on('move', (data) => {
  game.move(data.move);
  board.position(game.fen());
})

socket.on('restart', () => {
  board.start(true);
})

function makeMove(from, to, piece, position) {
  const move = game.move({
    from: from,
    to: to,
    piece: piece,
    position: position
  });
  if (move === null) {
    return 'snapback';
  } else {
    socket.emit('move', {
      move: move.san
    });
  }
};

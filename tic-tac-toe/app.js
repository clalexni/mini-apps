var state = {
  _player: 'x',
  _board: null,
  _winner: null,

  getCurrentPlayer: () => {
    return state._player;
  },

  getWinner: () => {
    return state._winner;
  },

  resetBoard: () => {
    console.log('board reset');
    state._player = state._winner || 'x'; // winner of last round go first
    state._winner = null;
    state._board = [];
    for (var i = 0; i < 3; i++) {
      state._board.push([null, null, null]);
    }
  },

  play: ([row, col]) => {
    // only playable if position [row, col] on the board is null
    // return true if played; return false otherwise
    if (state._board[row][col] === null) {
      // play position
      state._board[row][col] = state._player;
      // check if this is a winning play
      if (state._isWinningPlay([row, col])) {
        state._winner = state._player;
      }

      // swap next player
      if (state._player === 'x') {
        state._player = 'o';
      } else if (state._player === 'o') {
        state._player = 'x';
      }
      return true;
    }
    return false;
  },

  _isWinningPlay: ([row, col]) => {
    // check row and col
    var rowCount = 0;
    var colCount = 0;
    for (var i of state._board[row]) {
      if (i === state._player) {
        rowCount ++;
      }
    }
    for (var i = 0; i < 3; i++) {
      if (state._board[i][col] === state._player) {
        colCount++;
      }
    }
    if (rowCount === 3 || colCount === 3) {
      return true;
    }

    // check diagonal if row === col
    if (row === col) {  
      var majorDiagCount = 0;
      var minorDiagCount = 0;

      // check major diaganol
      for (var i = 0; i < 3; i++) {

        if (state._board[i][i] === state._player) {
          majorDiagCount++;
        }
      }

      // check minor diaganol
      for (var i = 0, j = 2; i < 3 && j >= 0; i++, j--) {
        if (state._board[i][i] === state._player) {
          minorDiagCount++;
        }
      }
      return majorDiagCount === 3 || minorDiagCount === 3;
    }
    return false;
  },
};


// controller
window.addEventListener('load', (event) => {
  state.resetBoard();
});

document.querySelectorAll('td').forEach( element => {
  element.addEventListener('click', (event) => { 
    var row = element.parentElement.rowIndex;
    var col = element.cellIndex;
    var currentPlayer = state.getCurrentPlayer();

    if (state.getWinner() === null && state.play([row, col])) {
      element.innerHTML = currentPlayer;
      if (state.getWinner() !== null) {
        console.log("win");
        setTimeout( () => {alert('you won, reset to start new game')}, 200);
      }
    }
  });
});

document.querySelector('button').addEventListener('click', (event) => {
  // reset board state
  state.resetBoard();
  // reset DOM
  document.querySelectorAll('td').forEach(element => {
    element.innerHTML = '';
  })
});
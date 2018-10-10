export default {
  socketID: '',
  gameID: '',
  playerSet: ['X', 'O'],
  playerSymbol: '',
  currentPlayer: '',
  gameBoard: [
    [
      {
        id: 1, symbol: '', xCord: 0, yCord: 0,
      },
      {
        id: 2, symbol: '', xCord: 1, yCord: 0,
      },
      {
        id: 3, symbol: '', xCord: 2, yCord: 0,
      },
    ],
    [
      {
        id: 4, symbol: '', xCord: 0, yCord: 1,
      },
      {
        id: 5, symbol: '', xCord: 1, yCord: 1,
      },
      {
        id: 6, symbol: '', xCord: 2, yCord: 1,
      },
    ],
    [
      {
        id: 7, symbol: '', xCord: 0, yCord: 2,
      }, {
        id: 8, symbol: '', xCord: 1, yCord: 2,
      }, {
        id: 9, symbol: '', xCord: 2, yCord: 2,
      },
    ],
  ],
  gameStatus: '',
  gameURL: '',
};

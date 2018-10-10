import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';


export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SOCKET_ID: {
      const { socketID } = action.payload;
      return {
        ...state,
        socketID,
      };
    }
    case actionTypes.CREATE_GAME: {
      const { gameID, playerSymbol } = action.payload;
      const APP_URL = process.env.NODE_ENV === 'production' // herokuURL is yet to be known
        ? 'herokuURL' : 'http://localhost:8080'; // my web-dev-server starts on 8080
      return {
        ...state,
        gameID,
        playerSymbol,
        currentPlayer: playerSymbol,
        gameStatus: 'waiting for second player',
        gameURL: `${APP_URL}/game?id=${gameID}&firstPlayer=${playerSymbol}`,
      };
    }
    case actionTypes.JOIN_GAME: {
      const { gameID, playerSymbol, firstPlayer } = action.payload;
      return {
        ...state,
        currentPlayer: firstPlayer,
        gameID,
        gameStatus: 'start game',
        playerSymbol,
      };
    }
    case actionTypes.NEW_PLAYER: {
      return {
        ...state,
        gameStatus: 'start game',
      };
    }
    case actionTypes.PLACE_SYMBOL: {
      const { xCord, yCord } = action.payload;
      const updatedGameBoard = [...state.gameBoard];
      updatedGameBoard[yCord][xCord].symbol = state.currentPlayer;
      return {
        ...state,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
        gameBoard: updatedGameBoard,
      };
    }
    default:
      return state;
  }
};

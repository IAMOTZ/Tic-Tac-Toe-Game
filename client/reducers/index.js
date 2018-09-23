import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';


export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PLAYER_SYMBOL: {
      const { playerSymbol } = action.payload;
      return {
        ...state,
        playerSymbol,
      };
    }
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
        ? 'herokuURL' : 'http://localhost:8082'; // my web-dev-server starts on 8082
      return {
        ...state,
        gameID,
        players: [playerSymbol],
        currentPlayer: playerSymbol,
        gameStatus: 'waiting for second player',
        gameURL: `${APP_URL}/game?id=${gameID}`,
      };
    }
    default:
      return state;
  }
};

import * as actionTypes from './actionTypes';

export const setPlayerName = playerName => ({
  type: actionTypes.SET_PLAYER_NAME,
  payload: { playerName },
});

export const setPlayerSymbol = playerSymbol => ({
  type: actionTypes.SET_PLAYER_SYMBOL,
  payload: { playerSymbol },
});

export const setSocketID = socketID => ({
  type: actionTypes.SET_SOCKET_ID,
  payload: { socketID },
});

export const createGame = (gameID, playerSymbol) => ({
  type: actionTypes.CREATE_GAME,
  payload: { gameID, playerSymbol },
});

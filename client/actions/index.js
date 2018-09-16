import * as actionTypes from './actionTypes';

export const setPlayerName = playerName => ({
  type: actionTypes.SET_PLAYER_NAME,
  payload: { playerName },
});

export const setPlayerSymbol = playerSymbol => ({
  type: actionTypes.SET_PLAYER_SYMBOL,
  payload: { playerSymbol },
});

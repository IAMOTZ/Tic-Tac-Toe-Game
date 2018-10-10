import * as actionTypes from './actionTypes';
import socket from '../socket';

export const newPlayer = () => ({ type: actionTypes.NEW_PLAYER });

export const setSocketID = socketID => ({
  type: actionTypes.SET_SOCKET_ID,
  payload: { socketID },
});

export const createGame = (gameID, playerSymbol) => ({
  type: actionTypes.CREATE_GAME,
  payload: { gameID, playerSymbol },
});

export const joinGame = (gameID, playerSymbol, firstPlayer) => {
  socket.emit('NEW_PLAYER', { gameID });
  return {
    type: actionTypes.JOIN_GAME,
    payload: { gameID, playerSymbol, firstPlayer },
  };
};

export const placeSymbol = (xCord, yCord) => ({
  type: actionTypes.PLACE_SYMBOL,
  payload: { xCord, yCord },
});

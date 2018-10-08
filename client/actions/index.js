import * as actionTypes from './actionTypes';
import socket from '../socket';

export const newPlayer = playerSymbol => ({
  type: actionTypes.NEW_PLAYER,
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

export const joinGame = (gameID, playerSymbol) => {
  socket.emit('NEW_PLAYER', { gameID, playerSymbol });
  return {
    type: actionTypes.JOIN_GAME,
    payload: { gameID, playerSymbol },
  };
};

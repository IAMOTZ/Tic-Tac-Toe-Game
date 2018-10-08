import io from 'socket.io-client';
import store from './store';
import { setSocketID, newPlayer } from './actions';

const APP_URL = process.env.NODE_ENV === 'production' ? 'herokuURL' : 'http://localhost:8000';
const socket = io(APP_URL);

let socketID;

socket.on('connect', () => {
  socketID = socket.id;
  store.dispatch(setSocketID(socketID));
});

socket.on('NEW_PLAYER', (data) => {
  if (data.gameID === socketID) {
    store.dispatch(newPlayer(data.playerSymbol));
  }
});

export default socket;

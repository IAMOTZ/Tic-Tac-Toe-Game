import io from 'socket.io-client';
import store from './store';
import { setSocketID } from './actions';

const APP_URL = process.env.NODE_ENV === 'production' ? 'herokuURL' : 'http://localhost:8000';
const socket = io(APP_URL);

socket.on('connect', () => {
  const socketID = socket.id;
  store.dispatch(setSocketID(socketID));
});

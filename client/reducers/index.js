import * as actionTypes from '../actions/actionTypes';

const initialState = {
  playerName: '',
  playerSymbol: '',
  playerSet: ['X', 'O'],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PLAYER_SYMBOL: {
      const { playerSymbol } = action.payload;
      return {
        ...state,
        playerSymbol,
      };
    }
    default:
      return state;
  }
};

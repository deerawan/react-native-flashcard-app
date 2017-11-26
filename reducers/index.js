import { FETCH_DECKS_SUCCESS } from '../actions/deck';

const initialState = {
  decks: [],
};

export default function decks(state = initialState, action) {
  switch (action.type) {
    case FETCH_DECKS_SUCCESS: {
      return {
        decks: action.decks,
      };
    }
    default: {
      return state;
    }
  }
}

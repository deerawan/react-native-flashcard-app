import {
  FETCH_DECKS_SUCCESS,
  FETCH_DECK_BY_ID_SUCCESS,
  SAVE_DECK_SUCCESS,
  SAVE_CARD_SUCCESS,
} from '../actions/deck';

const initialState = {
  decks: [],
  selectedDeck: null,
};

export default function decks(state = initialState, action) {
  switch (action.type) {
    case FETCH_DECKS_SUCCESS: {
      return {
        ...state,
        decks: action.decks,
      };
    }
    case FETCH_DECK_BY_ID_SUCCESS: {
      return {
        ...state,
        selectedDeck: action.deck,
      };
    }
    case SAVE_DECK_SUCCESS: {
      return {
        ...state,
        decks: {
          ...state.decks,
          ...action.deck,
        },
      };
    }
    case SAVE_CARD_SUCCESS: {
      const updatedDeck = action.deck;
      return {
        ...state,
        decks: {
          ...state.decks,
          [updatedDeck.title]: updatedDeck,
        },
        selectedDeck: updatedDeck,
      };
    }
    default: {
      return state;
    }
  }
}

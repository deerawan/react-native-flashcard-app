import * as api from '../utils/api';

export const FETCH_DECKS_SUCCESS = 'FETCH_DECKS_SUCCESS';

export function fetchDecksSuccess(decks) {
  return {
    type: FETCH_DECKS_SUCCESS,
    decks,
  };
}

export function fetchDecks() {
  return dispatch => {
    return api.getDecks().then(decks => dispatch(fetchDecksSuccess(decks)));
  };
}

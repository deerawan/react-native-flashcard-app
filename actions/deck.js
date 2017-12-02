import * as api from '../utils/api';

export const FETCH_DECKS_SUCCESS = 'FETCH_DECKS_SUCCESS';
export const FETCH_DECK_BY_ID_SUCCESS = 'FETCH_DECK_BY_ID_SUCCESS';
export const SAVE_DECK_SUCCESS = 'SAVE_DECK_SUCCESS';
export const SAVE_CARD_SUCCESS = 'SAVE_CARD_SUCCESS';

export function fetchDecksSuccess(decks) {
  return {
    type: FETCH_DECKS_SUCCESS,
    decks,
  };
}

export function fetchDeckByIdSuccess(deck) {
  return {
    type: FETCH_DECK_BY_ID_SUCCESS,
    deck,
  };
}

export function saveDeckSuccess(deck) {
  return {
    type: SAVE_DECK_SUCCESS,
    deck,
  };
}

export function saveCardSuccess(deck) {
  return {
    type: SAVE_CARD_SUCCESS,
    deck,
  };
}

export function fetchDecks() {
  return dispatch => {
    return api.getDecks().then(decks => dispatch(fetchDecksSuccess(decks)));
  };
}

export function fetchDeckById(deckId: string) {
  return dispatch => {
    return api
      .getDeckById(deckId)
      .then(deck => dispatch(fetchDeckByIdSuccess(deck)));
  };
}

export function saveDeck(deckTitle: string) {
  return dispatch => {
    return api
      .saveDeck(deckTitle)
      .then(deck => dispatch(saveDeckSuccess(deck)));
  };
}

export function saveCard(deckTitle: string, card) {
  return dispatch => {
    return api
      .addCardToDeck(deckTitle, card)
      .then(deck => dispatch(saveCardSuccess(deck)));
  };
}

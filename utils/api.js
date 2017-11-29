import * as _ from 'lodash';
import { AsyncStorage } from 'react-native';
import { DECK_STORAGE_KEY } from './deck';

const initialDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
};

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(decks => {
    if (decks === null) {
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(initialDecks));
      return initialDecks;
    }
    return JSON.parse(decks);
  });
}

export function getDeckById(id: string) {
  const decks = AsyncStorage.getItem(DECK_STORAGE_KEY);
  return decks.find(deck => deck.id === id);
}

export function saveDeck(deckTitle) {
  const newDeck = {
    [_.capitalize(deckTitle)]: {
      title: deckTitle,
      questions: [],
    },
  };
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(newDeck)).then(
    () => newDeck
  );
}

export function addCardToDeck(title: string, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(decks => {
    const data = JSON.parse(decks);
    const updatedDeck = {
      ...data[title],
      questions: [...data[title].questions, card],
    };
    const updatedData = {
      ...data,
      [title]: updatedDeck,
    };
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(updatedData));

    return updatedData;
  });
}

export function removeDecks() {
  return AsyncStorage.removeItem(DECK_STORAGE_KEY);
}

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
    return decks || initialDecks;
  });
}

export function getDeck(id: number) {
  const decks = AsyncStorage.getItem(DECK_STORAGE_KEY);
  return decks.find(deck => deck.id === id);
}

export function saveDeckTitle(title: string) {}

export function addCardToDeck(title: string, card) {}

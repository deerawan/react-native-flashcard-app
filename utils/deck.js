export const DECK_STORAGE_KEY = 'flashcard:decks';

export function getCardsCountLabel(deck) {
  const count = deck.questions ? deck.questions.length : 0;
  return count === 1 ? `${count} card` : `${count} cards`;
}

export const DECK_STORAGE_KEY = 'flashcard:decks';

export function getCardsCountLabel(deck) {
  const count = deck.questions.length;
  return count === 1 ? `${count} card` : `${count} cards`;
}

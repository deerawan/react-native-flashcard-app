export type Question = {
  answer: string,
  question: string,
};

export type Deck = {
  title: string,
  questions: Question[],
};

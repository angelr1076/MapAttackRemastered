let score = 0;
let wrongAnswers = 0;

export const getScore = () => score;
export const incrementScore = () => {
  score++;
};

export const getWrongAnswers = () => wrongAnswers;
export const incrementWrongAnswers = () => {
  wrongAnswers++;
};

export const resetGame = () => {
  score = 0;
  wrongAnswers = 0;
  document.querySelector('#wrong-answers').innerHTML = '';
  document.querySelector('#score').innerHTML = '';
};

'use strict';
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const btnnew = document.querySelector('.btn--new');
const btnrollel = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const score0 = document.querySelector('#current--0');
const score1 = document.querySelector('#current--1');

let score, active_player, current_score, playing;
const init = function () {
  current_score = 0;
  active_player = 0;
  score = [0, 0];
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;

  diceEl.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};

init();

const changing_player = function () {
  document.getElementById(`current--${active_player}`).textContent = 0;
  current_score = 0;
  active_player = active_player === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

btnrollel.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `./dice-${dice}.png`;
    if (dice !== 1) {
      current_score += dice;
      document.getElementById(`current--${active_player}`).textContent =
        current_score;
    } else {
      changing_player();
    }
  }
});

btnhold.addEventListener('click', function () {
  if (playing) {
    score[active_player] += current_score;
    document.getElementById(`score--${active_player}`).textContent =
      score[active_player];

    if (score[active_player] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${active_player}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active_player}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      changing_player();
    }
  }
});

btnnew.addEventListener('click', init);

const dice = document.getElementById('dice-value');
const rollBtn = document.getElementById('roll-btn');

const diceRoll = () => {
  const min = 1;
  const max = 6;
  const result = Math.floor(Math.random() * (max - min + 1)) + min;

  dice.textContent = result;
};

rollBtn.addEventListener('click', diceRoll);

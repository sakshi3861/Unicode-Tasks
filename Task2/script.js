let randomNumber;
    let attempts;
    let previousGuesses = [];

    const guessField = document.getElementById('guessField');
    const submitBtn = document.getElementById('submitGuess');
    const attemptsDisplay = document.getElementById('attempts');
    const prevGuessesDisplay = document.getElementById('previousGuesses');
    const feedback = document.getElementById('feedback');
    const restartBtn = document.getElementById('restartBtn');

    function initGame() {
      randomNumber = Math.floor(Math.random() * 100) + 1;
      attempts = 0;
      previousGuesses = [];

      attemptsDisplay.textContent = 'Attempts: 0';
      prevGuessesDisplay.textContent = 'Previous guesses: None';
      feedback.textContent = '';
      feedback.style.color = '';
      guessField.disabled = false;
      submitBtn.disabled = false;
      restartBtn.style.display = 'none';
      guessField.value = '';
      guessField.focus();
    }

    submitBtn.addEventListener('click', () => {
      const guess = Number(guessField.value);
      if (!guess || guess < 1 || guess > 100) {
        feedback.textContent = 'Please enter a valid number between 1 and 100.';
        feedback.style.color = 'orange';
        return;
      }

      attempts++;
      previousGuesses.push(guess);

      attemptsDisplay.textContent = `Attempts: ${attempts}`;
      prevGuessesDisplay.textContent = `Previous guesses: ${previousGuesses.join(', ')}`;

      if (guess === randomNumber) {
        feedback.textContent = `Correct! You got it in ${attempts} attempt${attempts > 1 ? 's' : ''}.`;
        feedback.style.color = 'green';
        endGame();
      } else if (guess < randomNumber) {
        feedback.textContent = 'Too low! Try again.';
        feedback.style.color = 'blue';
      } else {
        feedback.textContent = 'Too high! Try again.';
        feedback.style.color = 'blue';
      }

      guessField.value = '';
      guessField.focus();
    });

    function endGame() {
      guessField.disabled = true;
      submitBtn.disabled = true;
      restartBtn.style.display = 'inline-block';
    }

    restartBtn.addEventListener('click', initGame);
    initGame();
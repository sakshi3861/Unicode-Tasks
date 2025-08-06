class GuessTheNumberGame {
            constructor() {
                this.secretNumber = this.generateRandomNumber();
                this.lives = 7;
                this.guesses = [];
                this.gameOver = false;
                this.initializeElements();
                this.attachEventListeners();
                this.playSound('start');
            }

            generateRandomNumber() {
                return Math.floor(Math.random() * 100) + 1;
            }

            initializeElements() {
                this.guessInput = document.getElementById('guessInput');
                this.submitButton = document.getElementById('submitGuess');
                this.hintMessage = document.getElementById('hintMessage');
                this.hintArea = document.getElementById('hintArea');

                this.guessHistory = document.getElementById('guessHistory');
                this.guessList = document.getElementById('guessList');
                this.gameArea = document.getElementById('gameArea');
                this.gameOverScreen = document.getElementById('gameOverScreen');
                this.gameResult = document.getElementById('gameResult');
                this.finalMessage = document.getElementById('finalMessage');
                this.playAgainButton = document.getElementById('playAgain');
                this.restartButton = document.getElementById('restartGame');
                this.guessCount = document.getElementById('guessCount');
            }

            attachEventListeners() {
                this.submitButton.addEventListener('click', () => this.makeGuess());
                this.guessInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.makeGuess();
                });
                this.playAgainButton.addEventListener('click', () => this.resetGame());
                this.restartButton.addEventListener('click', () => this.resetGame());
                
                // Focus input on load
                this.guessInput.focus();
            }

            makeGuess() {
                if (this.gameOver) return;

                const guess = parseInt(this.guessInput.value);
                
                // Validate input
                if (!guess || guess < 1 || guess > 100) {
                    this.showHint('Please enter a number between 1 and 100! 🤔', 'warning');
                    this.animateElement(this.guessInput, 'shake');
                    this.playSound('error');
                    return;
                }

                // Check for duplicate guess
                if (this.guesses.includes(guess)) {
                    this.showHint('You already guessed that number! Try a different one. 🔄', 'warning');
                    this.animateElement(this.guessInput, 'shake');
                    this.playSound('error');
                    return;
                }

                // Process the guess
                this.guesses.push(guess);
                this.updateGuessHistory();
                this.updateGuessCount();

                if (guess === this.secretNumber) {
                    this.handleCorrectGuess();
                } else {
                    this.handleIncorrectGuess(guess);
                }

                this.guessInput.value = '';
                this.guessInput.focus();
            }

            handleCorrectGuess() {
                this.gameOver = true;
                this.showHint(`🎉 Congratulations! You guessed it! The number was ${this.secretNumber}!`, 'success');
                this.animateElement(this.hintMessage, 'bounce');
                this.playSound('win');
                setTimeout(() => this.showGameOver(true), 2000);
            }

            handleIncorrectGuess(guess) {
                this.lives--;

                if (this.lives === 0) {
                    this.gameOver = true;
                    this.showHint(`💔 Game Over! The number was ${this.secretNumber}. Better luck next time!`, 'danger');
                    this.playSound('lose');
                    setTimeout(() => this.showGameOver(false), 2000);
                } else {
                    const hint = guess > this.secretNumber ? 
                        `📉 Too high! Try a smaller number.` : 
                        `📈 Too low! Try a larger number.`;
                    
                    this.showHint(hint, 'info');
                    this.animateElement(this.hintMessage, 'pulse');
                    this.playSound('guess');
                }
            }

            showHint(message, type) {
                this.hintMessage.textContent = message;
                this.hintMessage.className = `text-lg font-semibold rounded-xl p-4 ${this.getHintStyles(type)}`;
                this.hintMessage.classList.remove('hidden');
            }

            getHintStyles(type) {
                const styles = {
                    success: 'text-green-700 bg-green-100 border-2 border-green-300',
                    danger: 'text-red-700 bg-red-100 border-2 border-red-300',
                    warning: 'text-yellow-700 bg-yellow-100 border-2 border-yellow-300',
                    info: 'text-blue-700 bg-blue-100 border-2 border-blue-300'
                };
                return styles[type] || 'text-gray-700 bg-gray-100';
            }



            updateGuessHistory() {
                this.guessHistory.classList.remove('hidden');
                const guessElement = document.createElement('span');
                const lastGuess = this.guesses[this.guesses.length - 1];
                
                guessElement.textContent = lastGuess;
                guessElement.className = 'bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold';
                
                // Color code based on how close the guess was
                const difference = Math.abs(lastGuess - this.secretNumber);
                if (difference <= 5) {
                    guessElement.className = 'bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm font-semibold';
                } else if (difference <= 15) {
                    guessElement.className = 'bg-yellow-200 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold';
                } else {
                    guessElement.className = 'bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm font-semibold';
                }
                
                this.guessList.appendChild(guessElement);
                this.animateElement(guessElement, 'bounce');
            }

            updateGuessCount() {
                this.guessCount.textContent = this.guesses.length;
            }



            showGameOver(won) {
                this.gameArea.classList.add('hidden');
                this.gameOverScreen.classList.remove('hidden');
                
                if (won) {
                    this.gameResult.textContent = '🏆 You Won!';
                    this.gameResult.className = 'text-2xl font-bold text-green-600';
                    this.finalMessage.textContent = `Amazing! You guessed the number ${this.secretNumber} in ${this.guesses.length} tries!`;
                } else {
                    this.gameResult.textContent = '💀 Game Over';
                    this.gameResult.className = 'text-2xl font-bold text-red-600';
                    this.finalMessage.textContent = `The secret number was ${this.secretNumber}. Don't give up, try again!`;
                }
                
                this.animateElement(this.gameOverScreen, 'bounce');
            }

            resetGame() {
                this.secretNumber = this.generateRandomNumber();
                this.lives = 7;
                this.guesses = [];
                this.gameOver = false;
                
                // Reset UI
                this.gameArea.classList.remove('hidden');
                this.gameOverScreen.classList.add('hidden');
                this.guessHistory.classList.add('hidden');
                this.hintMessage.classList.add('hidden');
                this.guessList.innerHTML = '';
                this.guessInput.value = '';
                this.updateGuessCount();
                this.guessInput.focus();
                
                this.playSound('start');
            }

            animateElement(element, animationType) {
                element.classList.add(animationType);
                setTimeout(() => element.classList.remove(animationType), 600);
            }

            playSound(type) {
                // Create audio context for sound effects
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                const sounds = {
                    start: { frequency: 440, duration: 0.2 },
                    guess: { frequency: 330, duration: 0.1 },
                    win: { frequency: 523, duration: 0.5 },
                    lose: { frequency: 220, duration: 0.8 },
                    error: { frequency: 150, duration: 0.3 }
                };
                
                const sound = sounds[type];
                if (!sound) return;
                
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(sound.frequency, audioContext.currentTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + sound.duration);
            }
        }

        // Initialize the game when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new GuessTheNumberGame();
        });
        
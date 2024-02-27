// Initialize win and loss counters
let wins = 0;
let losses = 0;

document.getElementById('spin-btn').addEventListener('click', function() {
  var userNumber = parseInt(document.getElementById('user-number').value);
  var betAmount = parseInt(document.getElementById('bet-amount').value);
  if (isNaN(userNumber) || userNumber < 1 || userNumber > 50 || isNaN(betAmount) || betAmount <= 0) {
    alert('Please enter valid numbers.');
    return;
  }

  var randomNumber = Math.floor(Math.random() * 50) + 1;
  
  // Adjust odds to increase probability of winning by 50%
  var difference = Math.abs(userNumber - randomNumber);
  var baseOdds = 100 - difference * 2;
  var adjustedOdds = baseOdds + 50; // Increase by 50%
  if (adjustedOdds > 100) {
    adjustedOdds = 100; // Cap the maximum probability to 100%
  }

  var resultDisplay = document.getElementById('result');
  var winAmount = 0;

  // Remove previous animation class
  resultDisplay.classList.remove('win-animation', 'lose-animation');
  resultDisplay.offsetHeight; // Trigger reflow to ensure CSS animation is reset

  if (userNumber === randomNumber) {
    wins++; // Increment wins counter
    winAmount = betAmount * (adjustedOdds / 100); // Calculate winnings based on adjusted odds
    resultDisplay.textContent = 'Congratulations! You win ' + winAmount.toFixed(2) + '! ';
    resultDisplay.classList.add('win-animation');
    resultDisplay.innerHTML += 'Congratulations! Add to your wins.';
  } else {
    losses++; // Increment losses counter
    resultDisplay.textContent = 'Sorry! You lose. The number was ' + randomNumber + '. ';
    resultDisplay.classList.add('lose-animation');
    resultDisplay.innerHTML += 'Try again.';
  }

  // Update win and loss counters display
  document.getElementById('win-counter').textContent = wins;
  document.getElementById('loss-counter').textContent = losses;
});

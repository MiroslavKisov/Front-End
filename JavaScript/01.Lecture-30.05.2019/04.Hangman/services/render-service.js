const renderService = (() => {

  //DISPLAYS THE EMPTY BOXES FOR THE GUESSED WORD.
  function renderWord(randomWord, wordContainer) {
    wordContainer.innerHTML = '';
  
    for(let letter of randomWord) {
      let currentLetterBox = document.createElement('div');
      let currentLetter = document.createElement('p');
  
      currentLetter.classList.add('hidden');
      currentLetter.textContent = letter;
  
      currentLetterBox.classList.add('letter');
      currentLetterBox.appendChild(currentLetter);
  
      wordContainer.appendChild(currentLetterBox);
    }
  }

  //DISPLAYS LINES FROM THE HANGMAN DEPENDING ON THE CURRENT GAME PROGRESS.
  function renderHangmanLine(lives) {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    context.strokeStyle = '#ffffff';
    context.beginPath();
  
    switch(lives) {
      case 9:
        context.moveTo(50, 300);
        context.lineTo(50, 20);
      break;
      case 8:
        context.moveTo(50, 20);
        context.lineTo(110, 20);
      break;
      case 7:
        context.moveTo(110, 20);
        context.lineTo(110, 50);
      break;
      case 6:
        context.moveTo(110, 50);
        context.arc(110, 60, 10, 1.5*Math.PI, 3.5*Math.PI);
      break;
      case 5:
        context.moveTo(110, 70);
        context.lineTo(110, 80);
      break;
      case 4:
        context.moveTo(110, 80);
        context.lineTo(140, 55);
      break;
      case 3:
        context.moveTo(110, 80);
        context.lineTo(80, 55);
      break;
      case 2:
        context.moveTo(110, 80);
        context.lineTo(110, 105);
      break;
      case 1:
        context.moveTo(110, 105);
        context.lineTo(125, 140);
      break;
      case 0:
        context.moveTo(110, 105);
        context.lineTo(95, 140);
      break;
    }
    context.stroke();
  }
  
  //DISPLAYS MESSAGE.
  function renderMessage(message) {
    let div = document.getElementById('message');
    div.textContent = '';
    div.textContent = message;
  }

  //PAINTS SELECTED LETTER RED OR GREEN DEPENDING ON IT'S CORRECTNESS.
  function paintLetter(isLetterGuessed, alphabetContainer, chosenLetter) {
    let letterBlockElement = alphabetContainer.filter(l => l.textContent === chosenLetter)[0];

    if(isLetterGuessed === true) {

      letterBlockElement.classList.add('correct-letter');
      letterBlockElement.classList.remove('active-letter');

    } else {

      letterBlockElement.classList.add('incorrect-letter');
      letterBlockElement.classList.remove('active-letter');
    }
  }

  //DISPLAYS CORRECTLY SELECTED LETTER IN THE GUESSED WORD BOXES.
  function renderGuessedLetter(wordContainer, chosenLetter) {
    Array.from(wordContainer)
    .filter(w => w.textContent === chosenLetter)
    .forEach(w => w.firstChild.classList.remove('hidden'));
  }

  //REFRESHES THE START PAGE
  function refreshStartPage(alphabetContainer) {
    Array.from(alphabetContainer)
    .forEach(a => a.classList.add('active-letter'));
    Array.from(alphabetContainer)
    .forEach(a => a.classList.remove('correct-letter', 'inactive-letter', 'incorrect-letter'));

    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  return {
    renderGuessedLetter,
    renderHangmanLine,
    renderWord,
    renderMessage,
    paintLetter,
    refreshStartPage,
  }

})();
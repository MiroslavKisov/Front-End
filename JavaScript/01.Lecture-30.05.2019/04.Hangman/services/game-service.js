const gameService =(() => {

  var playGame;

  //STARTS THE GAME
  function startGame(args) {
    let wordContainer = args[1];
    let alphabetContainer = args[2];
    let category = document.getElementById('category').value;
    let randomWord;
    window.lives = 10;

    if(category) {
      randomWord = dataService.getRandomWord(category);
    }

    renderService.refreshStartPage(alphabetContainer);

    renderService.renderMessage('PICK A LETTER.');

    switch(category) {
      case 'cities':
        renderService.renderWord(randomWord, wordContainer);
      break;
      case 'cars':
        renderService.renderWord(randomWord, wordContainer);
      break;
      case 'animals':
        renderService.renderWord(randomWord, wordContainer);
      break;
      case 'states':
        renderService.renderWord(randomWord, wordContainer);
      break;
      default:
        renderService.renderMessage(`PLEASE SELECT A CATEGORY, AND PRESS START`);
      break;
    }

    playGame = chooseLetter.bind(this, [wordContainer.children, alphabetContainer, randomWord]);
    eventService.addEvents('click', alphabetContainer, playGame);
  }

  //EXECUTES EACH TIME THE USER PRESSES A LETTER
  function chooseLetter(args) {
    event.stopPropagation();
  
    let wordContainer = args[0];
    let alphabetContainer = Array.from(args[1]);
    let randomWord = args[2];
    let chosenLetter = event.target.textContent;
    let isLetterGuessed = isLetterCorrect(chosenLetter, randomWord);
    
    if(isLetterGuessed) {

      renderService.renderGuessedLetter(wordContainer, chosenLetter);

    } else {

      window.lives--;

      renderService.renderHangmanLine(window.lives);
      renderService.renderMessage(`YOU HAVE ${window.lives} LEFT!`);
    }

    eventService.removeEvent('click', event.target, playGame);
    renderService.paintLetter(isLetterGuessed, alphabetContainer, chosenLetter);
    checkGameCompletion(window.lives, alphabetContainer, wordContainer);
  }

  //CHECKS THE CURRENT PROGRESS OF THE GAME
  function checkGameCompletion(lives, alphabetContainer, wordContainer) {
    if(isWordComplete(wordContainer) && window.lives > 0) {

      renderService.renderMessage('YOU WIN!');
      eventService.removeEvents('click', alphabetContainer, playGame);
      
    } else if(lives <= 0) {

      renderService.renderMessage('YOU LOSE!');
      eventService.removeEvents('click', alphabetContainer, playGame);
    }
  }

  //CHECKS IF THE GUESSED WORD IS COMPLETE
  function isWordComplete(wordContainer) {
    for(let letter of wordContainer) {
      if(letter.firstChild.classList.contains('hidden')) {
        return false;
      }
    }
    return true;
  }

  //CHECKS IF THE SELECTED LETTER IS CONTAINED IN THE GUESSED WORD
  function isLetterCorrect(chosenLetter, randomWord) {
    for(let letter of randomWord) {   
  
      if(letter === chosenLetter) {
        return true;
      }
    }

    return false;
  }

  return {
    startGame,
  }
})();
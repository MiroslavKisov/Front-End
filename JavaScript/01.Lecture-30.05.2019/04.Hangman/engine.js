const engine = (() => {
  function run() {

    let alphabetContainer = document.getElementById('alphabet').children;
    let wordContainer = document.getElementById('word');
    let words = dataService.getWords();
    let startButton = document.getElementById('start');

    Array.from(alphabetContainer)
      .forEach(a => a.classList.add('inactive-letter'));

    eventService.addEvent('click', startButton, gameService.startGame
    .bind(this, [words, wordContainer, alphabetContainer]));
  }

  return {
    run,
  }
})();
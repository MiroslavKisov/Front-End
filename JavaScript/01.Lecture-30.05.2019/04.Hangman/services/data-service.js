const dataService = (() => {

  let words = {
    cities : ['SOFIA', 'RIODEJANEIRO', 'NEWYORK', 'BERLIN', 'AMSTERDAM'],
    cars : ['PORSCHE', 'VOLKSWAGEN', 'TOYOTA', 'MERCEDES', 'LEXUS'],
    animals : ['ELEPHANT', 'GIRAFFE', 'BEAR', 'LION', 'TIGER', 'COCKATOO'],
    states : ['BULGARIA', 'SERBIA', 'GERMANY', 'DENMARK', 'HOLLAND', 'RUSSIA']
  };

  //RETURNS THE WORD OBJECT CONTAINING THE WORDS GROUPED BY CATEGORIES.
  function getWords() {
    return words;
  }

  //RETURNS A RANDOMLY GENERATED WORD FROM THE WORD OBJECT.
  function getRandomWord(category) {
    let wordIndex = Math.floor(Math.random() * words[category].length); 
    let randomWord = words[category][wordIndex];
    return randomWord;
  }

  return {
    getWords,
    getRandomWord,
  }
})();
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },

  printScores: function () {
    for (const [i, el] of this.scored.entries()) {
      console.log(`Goal ${i + 1}: ${el}`);
    }
  },

  calculateAverageOdd: function () {
    let sum = 0;
    const odds = Object.values(this.odds);
    for (const odd of odds) {
      sum += odd;
    }

    return sum / odds.length;
  },

  printOdds: function () {
    console.log(`Odds of victory ${this.team1}: ${this.odds.team1}`);
    console.log(`Odds of draw: ${this.odds.x}`);
    console.log(`Odds of victory ${this.team2}: ${this.odds.team2}`);
  },
};

game.printScores();
console.log(game.calculateAverageOdd());
game.printOdds();

const calcAverage = (firstScore, secondScore, thirdScore) => {
  return (firstScore + secondScore + thirdScore) / 3;
};

const avgKoalasFirstGame = calcAverage(65, 54, 49);
const avgDolphinsFirstGame = calcAverage(44, 23, 71);

const avgKoalasSecondGame = calcAverage(23, 34, 27);
const avgDolphinsSecondGame = calcAverage(85, 54, 41);

function checkWinner(avgKoalas, avgDolphins) {
  if (avgKoalas > avgDolphins) {
    console.log(`Koalas win ${avgKoalas} : ${avgDolphins}`);
    return {
      team: 'Koalas',
      points: avgKoalas - avgDolphins,
    };
  } else if (avgDolphins > avgKoalas) {
    console.log(`Dolphins win ${avgDolphins} : ${avgKoalas}`);
    return {
      team: 'Dolphins',
      points: avgDolphins - avgKoalas,
    };
  } else {
    console.log(`Draw ${avgKoalas} : ${avgDolphins}`);
  }
}

function checkOverallWinner() {
  const winnerFirstGameScore = checkWinner(
    avgKoalasFirstGame,
    avgDolphinsFirstGame
  );
  const winnerSecondGameScore = checkWinner(
    avgKoalasSecondGame,
    avgDolphinsSecondGame
  );
  console.log(winnerFirstGameScore, winnerSecondGameScore);

  if (winnerFirstGameScore.points > winnerSecondGameScore.points) {
    return `The overall winner is ${winnerFirstGameScore.team} with ${winnerFirstGameScore.points} : ${winnerSecondGameScore.points}`;
  } else if (winnerFirstGameScore.points < winnerSecondGameScore.points) {
    return `The overall winner is ${winnerSecondGameScore.team} with ${winnerSecondGameScore.points} : ${winnerFirstGameScore.points}`;
  } else {
    return `Draw ${winnerFirstGameScore.points} : ${winnerSecondGameScore.points}`;
  }
}

console.log(checkOverallWinner());

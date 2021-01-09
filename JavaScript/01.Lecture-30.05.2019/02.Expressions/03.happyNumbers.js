function happyNumbers() {
  let happyNumbers = [];
  let initialNumber = 1;
  let sum = 0;
  let digits = initialNumber.toString().split('').map(n => Number(n));

  while(happyNumbers.length < 5) {

    for(let i = 0; i < digits.length; i++) {
      sum += digits[i] * digits[i];
    }
    
    //The number is happy
    if(sum === 1) {
      happyNumbers.push(initialNumber);
      initialNumber++;
      sum = initialNumber;
    }

    //The number is unhappy
    if(sum === 145) {
      initialNumber++;
      sum = initialNumber;
    }

    digits = sum.toString().split('').map(n => Number(n));
    sum = 0;
  }

  return happyNumbers;
}

console.log(happyNumbers());
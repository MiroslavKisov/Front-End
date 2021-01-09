function signOfProduct(firstNumber, secondNumber, thirdNumber) {
    
  let result = firstNumber * secondNumber * thirdNumber;

  if(result >= 0) {
    return 'The sign is: +';
  } else {
    return 'The sign is: -';
  }
}
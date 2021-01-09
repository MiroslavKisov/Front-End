function minimum(firstNumber, secondNumber) {
  if(Object.prototype.toString.call(firstNumber) === '[object Number]' || 
    Object.prototype.toString.call(secondNumber) === '[object Number]') {
      return Math.min(firstNumber, secondNumber);
    }
  return 'Invalid parameters.';
}
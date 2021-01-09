function armstrongNumbers(startNumber, endNumber) {
  if(startNumber > endNumber) {
    return 'Start number must be smaller than endNumber.';
  }

  if(Object.prototype.toString.call(startNumber) !== '[object Number]' ||
    Object.prototype.toString.call(endNumber) !== '[object Number]') {
      return 'Invalid parameters. Both parameters must be numeric.';
  }

  if(!Number.isInteger(startNumber) || !Number.isInteger(endNumber)) {
    return 'Invalid parameters. Both parameters must by integers.';
  }

  let armstrongNumbers = [];
  
  for(let i = startNumber; i < endNumber; i++) {
      let digits = i.toString().split('');
      let currentNumber = 0;

    for(let j = 0; j < digits.length; j++) {
      currentNumber += Math.pow(digits[j], digits.length);
    }

    if(i === currentNumber) {
      armstrongNumbers.push(currentNumber);
    }
  }

  if(armstrongNumbers.length > 0) {
    return armstrongNumbers;
  }

  return 'No armstrong numbers were found in the given interval.';
}
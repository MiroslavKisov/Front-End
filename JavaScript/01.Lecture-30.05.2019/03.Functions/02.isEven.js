function isEven(num) {
  num = Math.abs(num);

  if(num === 1) {
    return false;
  }

  if(num === 2) {
    return true;
  }

  return isEven(num - 2);
}
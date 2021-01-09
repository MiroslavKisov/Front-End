function stringToArray(str) {
  if(typeof str === 'string' || str instanceof String) {
    return str.split(' ');
  }
  return 'Input is not of type string.';
}

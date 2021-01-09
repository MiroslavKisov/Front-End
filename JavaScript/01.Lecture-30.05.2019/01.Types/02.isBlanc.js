function isBlanc(str) {
  if(typeof str === 'string' || str instanceof String) {
    if(str === '') {
      return true;
    }
    return false;
  }
  return 'Input is not of type string.'; 
}

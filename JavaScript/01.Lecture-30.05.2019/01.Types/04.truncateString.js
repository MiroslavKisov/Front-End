function truncateString(str, subStrLength) {
  if(typeof str !== 'string' && !(str instanceof String)) {
      return 'Invalid parameter. First parameter must be of type string.'
  }
  if(isNaN(subStrLength) || !Number.isInteger(subStrLength)) {
    return 'Invalid parameter. Second parameter must be a integer number.';
  }
  return str.substring(0, subStrLength);
}

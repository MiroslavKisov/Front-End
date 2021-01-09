function isArray(input) {
  if(Object.prototype.toString.call(input) === '[object Array]') {
    return true;
  }
  return false;
}

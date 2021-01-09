function cloneArray(arr) {
  if(Object.prototype.toString.call(arr) !== '[object Array]') {
    return 'Invalid parameter. Parameter must be of type array.';
  }
  return arr.slice();
}

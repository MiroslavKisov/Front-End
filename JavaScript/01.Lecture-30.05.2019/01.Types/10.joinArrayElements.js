function joinArrayElements(arr) {
  if(Object.prototype.toString.call(arr) !== '[object Array]') {
    return 'Invalid parameter. First parameter must be of type array.';
  }

  return arr.join();
}
function countOfChar(str, searchedChar) {
  if(Object.prototype.toString.call(str) !== '[object String]') {
    return 'Invalid parameters. Parameter must be of type string.';
  }

  if(Object.prototype.toString.call(searchedChar) !== '[object String]') {
    return 'Invalid parameters. Parameter must be of type string.';
  }
    
  let countOfChar = 0;
  
  for(let i = 0; i < str.length; i++) {
    if(str[i] === searchedChar) {
      countOfChar++;
    }
  }
  
  return countOfChar;
}
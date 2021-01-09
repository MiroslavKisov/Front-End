function beanCounting(str) {
  if(Object.prototype.toString.call(str) !== '[object String]') {
    return 'Invalid parameters. Parameter must be of type string.';
  }
  
  let countOfB = 0;

  for(let i = 0; i < str.length; i++) {
    if(str[i] === 'B') {
      countOfB++;
    }
  }

  return countOfB;
}
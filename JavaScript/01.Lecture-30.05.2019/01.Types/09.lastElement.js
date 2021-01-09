function lastElement() {
  let arr;

  if(arguments.length === 1) {
    arr = arguments[0];

    if(Object.prototype.toString.call(arr) !== '[object Array]') {
      return 'Invalid parameter. First parameter must be of type array.';
    }
    
    if(arr.length > 0) {
      return arr[arr.length - 1];
    }
    
    if(arr.length === 0) {
      return [];
    }
  }

  if(arguments.length === 2) {
    arr = arguments[0];

    if(Object.prototype.toString.call(arr) !== '[object Array]') {
      return 'Invalid parameter. First parameter must be of type array.';
    }
      
    let numberOfElements = arguments[1];
      
    if(Object.prototype.toString.call(numberOfElements) !== '[object Number]') {
      return 'Invalid parameter. Second parameter must by of type number.';
    }
      
    if(!Number.isInteger(numberOfElements)) {
      return 'Invalid parameter. Second parameter must be integer number.';
    }
      
    if(numberOfElements < 0) {
      return 'Invelid parameter. Second parameter must be positive number.';
    }

    return arr.slice(Math.max(arr.length - numberOfelements, 0));
  }
}
function animalAgeConverter(ageInYears, conversionRate) {
  if(Object.prototype.toString.call(ageInYears) !== '[object Number]' ||
    Object.prototype.toString.call(conversionRate) !== '[object Number]') {
      return 'Invalid parameter. Parameters must be of type number.';
  }

  return ageInYears * conversionRate;
}
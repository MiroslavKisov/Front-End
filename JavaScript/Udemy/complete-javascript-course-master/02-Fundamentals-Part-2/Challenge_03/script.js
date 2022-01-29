const mark = {
  name: 'Mark',
  height: 1.69,
  weight: 78,
  calcBMI: function () {
    this.BMI = this.weight / this.height ** 2;
    return this.BMI;
  },
};

const john = {
  name: 'John',
  height: 1.95,
  weight: 92,
  calcBMI: function () {
    this.BMI = this.weight / this.height ** 2;
    return this.BMI;
  },
};

function compareBMI(firstPerson, secondPerson) {
  firstPerson.calcBMI();
  secondPerson.calcBMI();

  if (firstPerson.BMI > secondPerson.BMI) {
    return `${firstPerson.name}'s BMI: ${firstPerson.BMI} is higher than ${secondPerson.BMI}'s ${secondPerson.name}`;
  } else if (firstPerson.BMI < secondPerson.BMI) {
    return `${secondPerson.name}'s BMI: ${secondPerson.BMI} is higher than ${firstPerson.name}'s ${firstPerson.name}'s`;
  } else {
    return `Both BMI's are equal - ${firstPerson.BMI} : ${secondPerson.BMI}`;
  }
}

console.log(compareBMI(mark, john));

const markHeight = 1.69;
const johnHeight = 1.95;
const markMass = 78;
const johnMass = 92;

let markBMI = markMass / markHeight ** 2;
let johnBMI = johnMass / johnHeight ** 2;

console.log('Mark BMI: ' + markBMI + ' ' + 'JohnBMI: ' + johnBMI);

let message;

if (markBMI > johnBMI) {
  message = "Mark BMI is higher than John's";
} else {
  message = "John BMI is higher than Mark's";
}

console.log(message);

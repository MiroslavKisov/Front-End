'use strict';

const temperatures = [12, 35, 17, 28, 23, 30, 29];

function printForecast(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(`...${arr[i]} °C in ${i + 1} days...`);
  }
}

printForecast(temperatures);

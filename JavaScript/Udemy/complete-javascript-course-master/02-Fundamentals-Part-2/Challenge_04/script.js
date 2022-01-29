const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const total = [];

function calcAverage(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum / arr.length;
}

function calcTip(bill) {
  if (bill >= 50 && bill <= 300) {
    return bill * 0.15;
  } else {
    return bill * 0.2;
  }
}

function calcTips(bills, tips, total) {
  for (let i = 0; i < bills.length; i++) {
    tips.push(calcTip(bills[i]));
    total.push(tips[i] + bills[i]);
  }
}

calcTips(bills, tips, total);

console.log(tips);
console.log(total);
console.log(calcAverage(bills));

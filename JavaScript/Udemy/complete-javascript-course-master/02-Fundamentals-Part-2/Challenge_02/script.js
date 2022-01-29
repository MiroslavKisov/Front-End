const bills = [125, 777, 44];
const tips = [];
const total = [];

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
    total[i] = tips[i] + bills[i];
  }
}

calcTips(bills, tips, total);

console.log(tips);
console.log(total);

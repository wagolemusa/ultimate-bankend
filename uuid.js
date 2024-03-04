const crypto = require('crypto');

// function generateUniqueNumber() {
//   const uniqueNumbers = []
//   while (uniqueNumbers.size < 100000000) {
//     const randomNumber = Math.floor(Math.random() * 100000000);
//     uniqueNumbers.push(randomNumber);
//   }
//   return Array.from(uniqueNumbers);
// }

// const uniqueNumber = generateUniqueNumber();
// console.log(uniqueNumber);


// var items = [];
// var newItems = new Array(1000000);
// for(var i = 0; i < newItems.length; i++){
//   items.push(newItems[i]);
// }

// console.log(items)


const num = crypto.randomInt(10000000,99999999)

console.log(num)
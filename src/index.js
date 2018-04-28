const calculateDueDate = require('./calculateDueDate');

console.log(calculateDueDate('2018-04-27 10:00:00', 4));
console.log(calculateDueDate('2018-04-26 9:00:00', 10));
console.log(calculateDueDate('2018-04-02 09:00:00', 253));
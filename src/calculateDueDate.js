/**@flow*/
const CalculateDate = require('./CalculateDate');

module.exports = function calculateDueDate (submitDate: string|number, turnaroundTime: number)
{
	return new CalculateDate(submitDate).addHours(turnaroundTime).pretty;
};


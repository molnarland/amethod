/**@flow*/
const { workingHours, workingDays } = require('./global');
const CalculateDate = require('./CalculateDate');

module.exports = function checkDateTime (dateTime: CalculateDate): void
{
	checkIsValidDate();
	checkInWorkingRange();

	function checkIsValidDate (): void
	{
		if (isNaN(dateTime.getHours()))
		{
			throw TypeError('Given invalid date');
		}
	}

	function checkInWorkingRange (): void
	{
		checkIsBeforeWorkingHours();
		checkIsAfterWorkingHours();
		checkIsWeekend();
	}

	function checkIsBeforeWorkingHours (): void
	{
		if (dateTime.getHours() < workingHours.from)
		{
			throw Error('Given ticket too early');
		}
	}

	function checkIsAfterWorkingHours (): void
	{
		const error = Error('Given ticket too lately');
		const hour = dateTime.getHours();
		const hourTo = workingHours.to;

		if (hour > hourTo)
		{
			throw error;
		}

		if (hour === hourTo && (dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0))
		{
			throw error;
		}
	}

	function checkIsWeekend (): void
	{
		if (dateTime.getDay() < workingDays.from || dateTime.getDay() > workingDays.to)
		{
			throw Error('Nobody work on weekends!');
		}
	}

};
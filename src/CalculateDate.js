/**@flow*/
const { workingHours, workingDays } = require('./global');
const checkDate = require('./checkDateTime');

interface CalculateDateInterface
{
	+pretty: string;

	constructor (date: string|number): void;
	addHours (hours: number): CalculateDateInterface
}

module.exports = class CalculateDate extends Date implements CalculateDateInterface
{
	constructor (date: string|number)
	{
		super(date);

		checkDate(this);
	}

	addHours (hours: number): CalculateDate
	{
		const { from, to } = workingHours;
		const workingHoursInADay: number = to - from;
		let startHourInTheCurrentDay: number = this.getHours();

		while (hours !== 0)
		{
			const endingHours: number = startHourInTheCurrentDay + hours;

			if (hours > workingHoursInADay || endingHours > to)
			{
				hours -= Math.abs(startHourInTheCurrentDay - to);
				this._addOneWorkingDay();

				startHourInTheCurrentDay = from;
			}
			else
			{
				hours = 0;
				this.setHours(endingHours);
			}
		}

		return this;
	}

	get pretty (): string
	{
		const years = this.getFullYear();
		const months = this._addZeroToOneDigitNumber(this.getMonth() + 1);
		const days = this._addZeroToOneDigitNumber(this.getDate());
		const hours = this._addZeroToOneDigitNumber(this.getHours());
		const minutes = this._addZeroToOneDigitNumber(this.getMinutes());
		const seconds = this._addZeroToOneDigitNumber(this.getSeconds());

		return `${years}-${months}-${days} ${hours}:${minutes}:${seconds}`;
	}

	_addOneWorkingDay ()
	{
		const { from, to } = workingDays;

		let currentWeekDay: number;

		do
		{
			this.setDate(this.getDate() + 1);

			currentWeekDay = this.getDay();
		}
		while (currentWeekDay < from || currentWeekDay > to);
	}

	_addZeroToOneDigitNumber (number: number): string
	{
		return (number < 10) ? `0${number}` : String(number);
	}
};
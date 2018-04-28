/**@flow*/
const {workingHours, workingDays} = require('./global');

module.exports = class SubmitDate extends Date
{
	constructor (date: string|number)
	{
		super(date);

		this._checkIsValidDate();
		this._checkInWorkingRange();
	}

	_checkIsValidDate (): void
	{
		if (isNaN(this.getHours()))
		{
			throw TypeError('Given invalid date');
		}
	}

	_checkInWorkingRange (): void
	{
		this._checkIsBeforeWorkingHours();
		this._checkIsAfterWorkingHours();
		this._checkIsWeekend();
	}

	/**
	 * @private
	 */
	_checkIsBeforeWorkingHours (): void
	{
		if (this.getHours() < workingHours.from)
		{
			throw Error('Given ticket too early');
		}
	}

	/**
	 * @private
	 */
	_checkIsAfterWorkingHours (): void
	{
		const error = Error('Given ticket too lately');
		const hour = this.getHours();
		const hourTo = workingHours.to;

		if (hour > hourTo)
		{
			throw error;
		}

		if (hour === hourTo && (this.getMinutes() > 0 || this.getSeconds() > 0))
		{
			throw error;
		}
	}

	_checkIsWeekend (): void
	{
		if (this.getDay() < workingDays.from || this.getDay() > workingDays.to)
		{
			throw Error('Nobody work on weekends!');
		}
	}
};
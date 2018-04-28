/**@flow*/
const { workingHours, workingDays } = require('./global');

interface SubmitDateInterface
{
	+pretty: string;

	constructor (date: string|number): void;
	addHours (hours: number): SubmitDateInterface
}

module.exports = class SubmitDate extends Date implements SubmitDateInterface
{
	constructor (date: string|number)
	{
		super(date);

		this._checkIsValidDate();
		this._checkInWorkingRange();
	}

	addHours (hours: number): SubmitDate
	{
		this.setHours(this.getHours() + hours);

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

	_addZeroToOneDigitNumber (number: number): string
	{
		return (number < 10) ? `0${number}` : String(number);
	}

	/**
	 * @private
	 */
	_checkIsValidDate (): void
	{
		if (isNaN(this.getHours()))
		{
			throw TypeError('Given invalid date');
		}
	}

	/**
	 * @private
	 */
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

	/**
	 * @private
	 */
	_checkIsWeekend (): void
	{
		if (this.getDay() < workingDays.from || this.getDay() > workingDays.to)
		{
			throw Error('Nobody work on weekends!');
		}
	}
};
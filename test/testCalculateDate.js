const expect = require('chai').expect;
const CalculateDate = require('../build/CalculateDate');


describe('CalculateDate', () =>
{
	describe('errors', () =>
	{
		it('should throw invalid date', () =>
		{
			expect(() => new CalculateDate('2018-04-27T9:05:00'))
				.to
				.throw(TypeError, 'Given invalid date');

			expect(() => new CalculateDate('mi az a juhéj? birkabunda'))
				.to
				.throw(TypeError, 'Given invalid date');
		});

		describe('working hours', () =>
		{
			it('should throw when get date before working hours', () =>
			{
				expect(() => new CalculateDate('2018-04-27 8:59:00'))
					.to
					.throw(Error, 'Given ticket too early');
			});

			it('should throw when get date after working hours', () =>
			{
				expect(() => new CalculateDate('2018-04-27 17:01:00'))
					.to
					.throw(Error, 'Given ticket too lately');

				expect(() => new CalculateDate('2018-04-27 17:00:01'))
					.to
					.throw(Error, 'Given ticket too lately');

				expect(() => new CalculateDate('2018-04-27 18:00:00'))
					.to
					.throw(Error, 'Given ticket too lately');
			});
		});

		describe('working days', () =>
		{
			it('should throw in weekends', () =>
			{
				expect(() => new CalculateDate('2018-04-29 17:00:00'))
					.to
					.throw(Error, 'Nobody work on weekends!');

				expect(() => new CalculateDate('2018-04-28 09:00:00'))
					.to
					.throw(Error, 'Nobody work on weekends!');
			});
		});
	});

	describe('#pretty()', () =>
	{
		it('should get out the date how set in', () =>
		{
			expect(new CalculateDate('2018-04-27 09:06:00').pretty)
				.to
				.equal('2018-04-27 09:06:00');

			expect(new CalculateDate('605-01-11 09:01:11').pretty)
				.to
				.equal('605-01-11 09:01:11');
		});
	});

	describe('#addHours()', () =>
	{
		it('on a day', () =>
		{
			expect(new CalculateDate('2018-04-27 10:00:00').addHours(4).pretty)
				.to
				.equal('2018-04-27 14:00:00');

			expect(new CalculateDate('2018-04-26 9:00:00').addHours(5).pretty)
				.to
				.equal('2018-04-26 14:00:00');

			expect(new CalculateDate('2018-04-25 9:00:00').addHours(8).pretty)
				.to
				.equal('2018-04-25 17:00:00');
		});


		it('through 2 days', () =>
		{
			expect(new CalculateDate('2018-04-24 10:00:00').addHours(8).pretty)
				.to
				.equal('2018-04-25 10:00:00');

			expect(new CalculateDate('2018-04-26 9:00:00').addHours(10).pretty)
				.to
				.equal('2018-04-27 11:00:00');

			expect(new CalculateDate('2018-04-25 16:00:00').addHours(2).pretty)
				.to
				.equal('2018-04-26 10:00:00');
		});

		it('through 3 days', () =>
		{
			expect(new CalculateDate('2018-04-24 10:00:00').addHours(16).pretty)
				.to
				.equal('2018-04-26 10:00:00');

			expect(new CalculateDate('2018-04-23 11:00:00').addHours(15).pretty)
				.to
				.equal('2018-04-25 10:00:00');

			expect(new CalculateDate('2018-04-24 16:00:00').addHours(12).pretty)
				.to
				.equal('2018-04-26 12:00:00');
		});

		it('with big numbers', () =>
		{
			expect(new CalculateDate('2018-04-02 09:00:00').addHours(121).pretty)
				.to
				.equal('2018-04-23 10:00:00');

			expect(new CalculateDate('2018-04-02 09:00:00').addHours(253).pretty)
				.to
				.equal('2018-05-15 14:00:00')
		});
	});
});
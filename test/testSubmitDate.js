const expect = require('chai').expect;
const SubmitDate = require('../build/SubmitDate');


describe('SubmitDate', () =>
{
	describe('errors', () =>
	{
		it('should throw invalid date', () =>
		{
			expect(() => new SubmitDate('2018-04-27T9:05:00'))
				.to
				.throw(TypeError, 'Given invalid date');

			expect(() => new SubmitDate('mi az a juhéj? birkabunda'))
				.to
				.throw(TypeError, 'Given invalid date');
		});

		describe('working hours', () =>
		{
			it('should throw when get date before working hours', () =>
			{
				expect(() => new SubmitDate('2018-04-27 8:59:00'))
					.to
					.throw(Error, 'Given ticket too early');
			});

			it('should throw when get date after working hours', () =>
			{
				expect(() => new SubmitDate('2018-04-27 17:01:00'))
					.to
					.throw(Error, 'Given ticket too lately');

				expect(() => new SubmitDate('2018-04-27 17:00:01'))
					.to
					.throw(Error, 'Given ticket too lately');

				expect(() => new SubmitDate('2018-04-27 18:00:00'))
					.to
					.throw(Error, 'Given ticket too lately');
			});
		});

		describe('working days', () =>
		{
			it('should throw in weekends', () =>
			{
				expect(() => new SubmitDate('2018-04-29 17:00:00'))
					.to
					.throw(Error, 'Nobody work on weekends!');

				expect(() => new SubmitDate('2018-04-28 09:00:00'))
					.to
					.throw(Error, 'Nobody work on weekends!');
			});
		});
	});
});
const expect = require('chai').expect;
const calculateDueDate = require('../build/calculateDueDate');

describe('#calculateDueDate()', () =>
{
	it('should return string', () =>
	{
		expect(calculateDueDate('2018-04-27 10:00:00', 4))
			.to
			.be
			.a('string');
	});
});
const expect = require('chai').expect;
const calculateDueDate = require('../build/calculateDueDate');

describe('#calculateDueDate()', () =>
{


	it('on a day', () =>
	{
		expect(calculateDueDate('2018-04-27 10:00:00', 4))
	});
});
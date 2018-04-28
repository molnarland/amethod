/**@flow*/

type workingRangeObject = {
	from: number,
	to: number
}

type globalsObject = {
	workingHours: workingRangeObject,
	workingDays: workingRangeObject,
}

const globals: globalsObject = {
	workingHours: {
		from: 9,
		to: 17
	},
	workingDays: {
		from: 1,
		to: 5
	}
};

module.exports = globals;
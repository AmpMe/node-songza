"use strict";

module.exports = function(request, settings) {

	var self = {};

	self.getNumberFromDate = function(date) {
		var hour = date.getHours();
		if (hour < 4) { return 5; } // 'late night'
		if (hour < 8) { return 0; } // 'morning'
		if (hour < 12) { return 1; } // 'late-morning'
		if (hour < 16) { return 2; } // 'afternoon'
		if (hour < 20) { return 3; } // 'evening'
		if (hour < 24) { return 4; } // 'night'

		throw new Error('Invalid Date');
	};

	self.getCurrentNumber = function() {
		return self.getNumberFromDate(new Date());
	};

	self.getDescriptionFromDate = function(date) {
		var weekday = new Array(7);
		weekday[0]=  'Sunday';
		weekday[1] = 'Monday';
		weekday[2] = 'Tuesday';
		weekday[3] = 'Wednesday';
		weekday[4] = 'Thursday';
		weekday[5] = 'Friday';
		weekday[6] = 'Saturday';

		var description = new Array(6);
		description[0] = 'Morning';
		description[1] = 'Late Morning';
		description[2] = 'Afternoon';
		description[3] = 'Evening';
		description[4] = 'Night';
		description[5] = 'Late Night';

		var number = self.getNumberFromDate(date);

		return weekday[date.getDay()] + ' ' + description[number];
	};

	self.getCurrentDescription = function() {
		return self.getDescriptionFromDate(new Date());
	};

	return self;

};

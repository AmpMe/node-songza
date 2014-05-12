"use strict";

var _ = require('lodash')
, request = require('../request')
, settings = require('../settings');

exports.targeted = function(maxSituations, maxStations, currentDate) {

	currentDate = currentDate || new Date();

	var offsetHours = (currentDate.getTimezoneOffset() / 60);
	offsetHours = String('00' + offsetHours).slice(-2);
	offsetHours = Number(offsetHours) > 0
		? '+' + offsetHours
		: String(offsetHours);
	offsetHours += ':00';

	// 05 = May
	// 2014-05-09T12:23:14+04:00
	var current_date = (
		currentDate.getFullYear() + '-' +
		String('00' + (currentDate.getMonth() + 1)).slice(-2) + '-' +
		String('00' + currentDate.getDate()).slice(-2) +
		'T' +
		String('00' + currentDate.getHours()).slice(-2) + ':' +
		String('00' + currentDate.getMinutes()).slice(-2) + ':' +
		String('00' + currentDate.getSeconds()).slice(-2) +
		offsetHours
	);

	var day = currentDate.getDay() + 1;

	var requestOptions = {
		uri: settings.base + '/situation/targeted',
		qs: {
			current_date: current_date,
			day: day,
			period: 2,
			site: 'songza',
			optimizer: 'default',
			max_situations: maxSituations || 5,
			max_stations: maxStations || 3,
			device: 'web'
		}
	};
	return request.songza(requestOptions);
};

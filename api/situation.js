"use strict";

var _ = require('lodash');

module.exports = function(request, settings) {

	var self = {};

	self.getTargeted = function(options) {

		options = options || {};
		var currentDate = options.currentDate || new Date();
		var maxSituations = options.maxSituations || 5;
		var maxStations = options.maxStations || 3;

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
				site: settings.site,
				optimizer: 'default',
				max_situations: maxSituations,
				max_stations: maxStations,
				device: settings.device
			}
		};
		return request.songza(requestOptions);
	};

	// Need proper access to create a new tag, else 403 forbidden
	self.createTag = function(tagName, tagSlug) {
		return request.songza({
			uri: settings.base + '/tags/create',
			method: 'POST',
			form: {
				site: settings.site,
				name: tagName,
				slug: tagSlug
			}
		});
	};

	// 403 forbidden
	self.create = function() {

	};

	return self;

};

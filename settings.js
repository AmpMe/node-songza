"use strict";

var _ = require('lodash');

exports.get = function(userSettings) {

	userSettings = userSettings || {};

	if (!userSettings.userAgent || !_.isString(userSettings.userAgent)) {
		throw new Error('You must specify a userAgent');
	}

	var defaultSettings = {
		site: 'songza',
		device: 'web',
		base: 'http://songza.com/api/1'
	};

	return _.assign(defaultSettings, userSettings);
};

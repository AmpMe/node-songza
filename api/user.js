"use strict";

var _ = require('lodash')
, request = require('../request')
, settings = require('../settings');

exports.profile = function(userId) {
	var uri = settings.base + '/user/' + userId;
	return request.songza(uri);
};

exports.stations = function(userId, recent, limit) {
	var options = {
		uri: '/user/' + userId + '/stations',
		recent: 1
	};

	if (!_.isUndefined(recent)) {
		options.qs.recent = recent ? 1 : 0;
	}

	if (!_.isUndefined(limit)) {
		options.qs.limit = limit;
	}

	return request.songza(options);
};

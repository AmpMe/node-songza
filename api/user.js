"use strict";

var _ = require('lodash')
, request = require('../request')
, settings = require('../settings');

exports.getCurrent = function() {
	return request.songza(settings.base + '/get-user');
};

exports.profile = function(userId) {
	var uri = settings.base + '/user/' + userId;
	return request.songza(uri);
};

exports.stations = function(userId, options) {

	var requestOptions = {
		uri: settings.base + '/user/' + userId + '/stations',
		qs: {}
	};

	if (!_.isUndefined(options.recent)) {
		requestOptions.qs.recent = options.recent ? 1 : 0;
	}

	if (!_.isUndefined(options.created)) {
		requestOptions.qs.created = options.created ? 1 : 0;
	}

	if (!_.isUndefined(options.allCreated)) {
		requestOptions.qs.allCreated = options.allCreated ? 1 : 0;
	}

	if (!_.isUndefined(options.limit)) {
		requestOptions.qs.limit = options.limit;
	}

	return request.songza(requestOptions);
};

exports.follow = function(userId) {
	return request.songza({
		uri: settings.base + '/follow',
		method: 'POST',
		form: { user_id: userId }
	});
};

exports.unfollow = function(userId) {
	return request.songza({
		uri: settings.base + '/unfollow',
		method: 'POST',
		form: { user_id: userId }
	});
};

exports.getFollows = function(userId) {
	return request.songza(settings.base + '/get-follows/' + userId);
};

exports.getFollowers = function(userId) {
	return request.songza(settings.base + '/get-followers/' + userId);
};

exports.feed = function(userId) {
	return request.songza(settings.base + '/feed/user/' + userId);
};

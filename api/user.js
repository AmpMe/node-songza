"use strict";

var _ = require('lodash')
, request = require('../request')
, settings = require('../settings');

exports.profile = function(userId) {
	var uri = settings.base + '/user/' + userId;
	return request.songza(uri);
};

exports.stations = function(userId, recent, created, allCreated, limit) {

	var options = {
		uri: settings.base + '/user/' + userId + '/stations',
		recent: 1
	};

	if (!_.isUndefined(recent)) {
		options.qs.recent = recent ? 1 : 0;
	}

	if (!_.isUndefined(created)) {
		options.qs.created = created ? 1 : 0;
	}

	if (!_.isUndefined(allCreated)) {
		options.qs.allCreated = allCreated ? 1 : 0;
	}

	if (!_.isUndefined(limit)) {
		options.qs.limit = limit;
	}

	return request.songza(options);
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

exports.getCurrent = function() {
	return request.songza(settings.base + '/get-user');
};

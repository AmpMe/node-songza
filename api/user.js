"use strict";

var _ = require('lodash');

module.exports = function(request, settings) {

	var self = {};

	self.getCurrent = function() {
		return request.songza(settings.base + '/get-user');
	};

	self.profile = function(userId) {
		var uri = settings.base + '/user/' + userId;
		return request.songza(uri);
	};

	self.stations = function(userId, options) {

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

	self.follow = function(userId) {
		return request.songza({
			uri: settings.base + '/follow',
			method: 'POST',
			form: { user_id: userId }
		});
	};

	self.unfollow = function(userId) {
		return request.songza({
			uri: settings.base + '/unfollow',
			method: 'POST',
			form: { user_id: userId }
		});
	};

	self.getFollows = function(userId) {
		return request.songza(settings.base + '/get-follows/' + userId);
	};

	self.getFollowers = function(userId) {
		return request.songza(settings.base + '/get-followers/' + userId);
	};

	self.feed = function(userId) {
		return request.songza(settings.base + '/feed/user/' + userId);
	};

	return self;

};

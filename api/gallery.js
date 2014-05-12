"use strict";

var request = require('../request')
, settings = require('../settings');

exports.tagMoods = function() {
	var uri = settings.base + '/gallery/tag/moods';
	return request.songza(uri);
};

exports.tagDecades = function() {
	var uri = settings.base + '/gallery/tag/decades';
	return request.songza(uri);
};

exports.tagGenres = function() {
	var uri = settings.base + '/gallery/tag/genres';
	return request.songza(uri);
};

exports.tagActivities = function() {
	var uri = settings.base + '/gallery/tag/activities';
	return request.songza(uri);
};

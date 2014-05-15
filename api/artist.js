"use strict";

var request = require('../request')
, settings = require('../settings');

exports.details = function(artistId) {
	var uri = settings.base + '/artist/' + artistId;
	return request.songza(uri);
};

exports.suggest = function(name, number) {
	number = number || 10;
	return request.songza({
		uri: settings.base + '/suggest/artist',
		qs: { name: name, num: number }
	});
};

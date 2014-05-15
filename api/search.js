"use strict";

var request = require('../request')
, settings = require('../settings');

function search(uri, query, limit) {
	var options = {
		uri: uri,
		qs: { query: query }
	};

	if (limit) {
		options.qs.limit = limit;
	}

	return request.songza(options);
}

exports.artist = function(query, limit) {
	return search(settings.base + '/search/artist', query, limit);
};

exports.station = function(query, limit) {
	return search(settings.base + '/search/station', query, limit);
};

exports.song = function(query, limit) {
	return search(settings.base + '/search/song', query, limit);
};

exports.situation = function(query, limit) {
	return search(settings.base + '/search/situation', query, limit);
};

exports.gallery = function(query, limit) {
	return search(settings.base + '/search/gallery', query, limit);
};

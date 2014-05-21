"use strict";

module.exports = function(request, settings) {

	var self = {};

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

	self.artist = function(query, limit) {
		return search(settings.base + '/search/artist', query, limit);
	};

	self.station = function(query, limit) {
		return search(settings.base + '/search/station', query, limit);
	};

	self.song = function(query, limit) {
		return search(settings.base + '/search/song', query, limit);
	};

	self.situation = function(query, limit) {
		return search(settings.base + '/search/situation', query, limit);
	};

	self.gallery = function(query, limit) {
		return search(settings.base + '/search/gallery', query, limit);
	};

	return self;

};

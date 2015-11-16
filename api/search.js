"use strict";

module.exports = function(request, settings) {

	var self = {};

	function search(uri, query, limit, offset) {
		var options = {
			uri: uri,
			qs: { query: query }
		};

		if (limit) {
			options.qs.limit = limit;
		}

		if (offset) {
			options.qs.offset = offset;
		}

		return request.songza(options);
	}

	self.artist = function(query, limit, offset) {
		return search(settings.base + '/search/artist', query, limit, offset);
	};

	self.station = function(query, limit, offset) {
		return search(settings.base + '/search/station', query, limit, offset);
	};

	self.song = function(query, limit, offset) {
		return search(settings.base + '/search/song', query, limit, offset);
	};

	self.situation = function(query, limit, offset) {
		return search(settings.base + '/search/situation', query, limit, offset);
	};

	self.gallery = function(query, limit, offset) {
		return search(settings.base + '/search/gallery', query, limit, offset);
	};

	return self;

};

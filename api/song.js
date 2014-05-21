"use strict";

module.exports = function(request, settings) {

	var self = {};

	self.details = function(songId) {
		var uri = settings.base + '/song/' + songId;
		return request.songza(uri);
	};

	return self;

};

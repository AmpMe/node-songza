"use strict";

module.exports = function(request, settings) {

	var self = {};

	self.details = function(artistId) {
		var uri = settings.base + '/artist/' + artistId;
		return request.songza(uri);
	};

	self.suggest = function(name, number) {
		number = number || 10;
		return request.songza({
			uri: settings.base + '/suggest/artist',
			qs: { name: name, num: number }
		});
	};

	return self;

};

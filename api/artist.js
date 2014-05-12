"use strict";

var request = require('../request')
, settings = require('../settings');

exports.details = function(artistId) {
	var uri = settings.base + '/artist/' + artistId;
	return request.songza(uri);
};

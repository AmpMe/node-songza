"use strict";

var request = require('../request')
, settings = require('../settings');

exports.details = function(songId) {
	var uri = settings.base + '/song/' + songId;
	return request.songza(uri);
};

"use strict";

var request = require('../request')
, settings = require('../settings');

exports.tags = function() {
	var uri = settings.base + '/tags';
	return request.songza(uri);
};

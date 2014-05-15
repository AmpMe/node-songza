"use strict";

var request = require('../request')
, settings = require('../settings');

exports.get = function(galleryId) {
	return request.songza(settings.base + '/gallery/id/' + galleryId);
};

exports.getBatch = function(galleryIds) {
	return request.songza({
		uri: settings.base + '/gallery/multi',
		qs: { ids: galleryIds }
	});
};

exports.tag = function(tagId) {
	return request.songza(settings.base + '/gallery/tag/' + tagId);
};

// 403 Forbidden
exports.createGallery = function() {};

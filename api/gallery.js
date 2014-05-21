"use strict";

module.exports = function(request, settings) {

	var self = {};

	self.get = function(galleryId) {
		return request.songza(settings.base + '/gallery/id/' + galleryId);
	};

	self.getBatch = function(galleryIds) {
		return request.songza({
			uri: settings.base + '/gallery/multi',
			qs: { ids: galleryIds }
		});
	};

	self.tag = function(tagId) {
		return request.songza(settings.base + '/gallery/tag/' + tagId);
	};

	// 403 Forbidden
	self.createGallery = function() {};

	return self;

};

"use strict";

module.exports = function(request, settings) {

	var self = {};

	// 403 forbidden
	self.create = function(site, product, stationId, imageUrl, isActive) {
		return request.songza({
			uri: settings.base + '/promotion/create',
			method: 'POST',
			form: {
				site: site,
				product: product,
				station_id: stationId,
				image_url: imageUrl,
				active: isActive
			}
		});
	};

	return self;

};

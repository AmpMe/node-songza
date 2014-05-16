"use strict";

var request = require('../request')
, settings = require('../settings');

// 403 forbidden
exports.create = function(site, product, stationId, imageUrl, isActive) {
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

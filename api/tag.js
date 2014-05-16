"use strict";

var request = require('../request')
, settings = require('../settings');

exports.getAll = function(featured) {
	featured = featured || true;
	return request.songza({
		uri: settings.base + '/tags',
		qs: {
			site: settings.site,
			featured: featured ? 1 : 0
		}
	});
};

exports.get = function(tagId) {
	return request.songza(settings.base + '/tags/id/' + tagId);
};

// Need proper access to create a new tag, else 403 forbidden
exports.createTag = function(tagName, tagSlug) {
	return request.songza({
		uri: settings.base + '/tags/create',
		method: 'POST',
		form: {
			site: settings.site,
			name: tagName,
			slug: tagSlug
		}
	});
};

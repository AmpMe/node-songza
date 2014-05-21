"use strict";

module.exports = function(request, settings) {

	var self = {};

	self.getAll = function(featured) {
		featured = featured || true;
		return request.songza({
			uri: settings.base + '/tags',
			qs: {
				site: settings.site,
				featured: featured ? 1 : 0
			}
		});
	};

	self.get = function(tagId) {
		return request.songza(settings.base + '/tags/id/' + tagId);
	};

	// Need proper access to create a new tag, else 403 forbidden
	self.createTag = function(tagName, tagSlug) {
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

	return self;

};

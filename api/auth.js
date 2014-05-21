"use strict";

module.exports = function(request, settings) {

	var self = {};

	self.login = function(username, password) {
		return request.songza({
			uri: settings.base + '/login/pw',
			method: 'POST',
			form: {
				username: username,
				password: password,
				site: settings.site
			}
		});
	};

	self.logout = function() {
		return request.songza(settings.base + '/logout');
	};

	return self;

};

"use strict";

module.exports = function(request, settings) {

	var self = {};

	self.login = function(username, password) {
		return request.ensureSessionExists().then(function() {

			var csrftoken = request.getCookieValue('songza.com', '/', 'csrftoken');

			return request.promise({
				uri: 'http://songza.com/login/',
				method: 'POST',
				qs: { next: '/' },
				form: {
					'csrfmiddlewaretoken': csrftoken,
					'state-next': '/',
					'state-mode': '',
					'login-username': username,
					'login-password': password
				}
			});

		});

	};

	self.logout = function() {
		request.clearSession();
	};

	return self;

};

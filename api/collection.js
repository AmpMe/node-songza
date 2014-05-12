"use strict";

var request = require('../request')
, settings = require('../settings');

exports.user = function(userId) {
	var uri = settings.base + '/collection/user/' + userId;
	return request.songza(uri);
};

exports.addStation = function(collectionId, stationId) {
	var requestOptions = {
		uri: settings.base + '/collection/' + collectionId + '/add-station',
		method: 'POST',
		form: { station: stationId }
	};

	return request.songza(requestOptions);
};

exports.removeStation = function(collectionId, stationId) {
	var requestOptions = {
		uri: settings.base + '/collection/' + collectionId + '/remove-station',
		method: 'POST',
		form: { station: stationId }
	};

	return request.songza(requestOptions);
};

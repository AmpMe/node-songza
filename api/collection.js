"use strict";

var request = require('../request')
, settings = require('../settings');

exports.user = function(userId) {
	var uri = settings.base + '/collection/user/' + userId;
	return request.songza(uri);
};

exports.getById = function(userId, collectionId) {
	return exports.user(userId).then(function(userCollection) {
		return userCollection.filter(function(coll) {
			return coll.id === collectionId;
		});
	}).then(function(result) {
		if (result.length === 0) { return void 0; }
		return result[0];
	});
};

exports.getByTitle = function(userId, collectionTitle) {
	return exports.user(userId).then(function(userCollection) {
		return userCollection.filter(function(coll) {
			return coll.title === collectionTitle;
		});
	}).then(function(result) {
		if (result.length === 0) { return void 0; }
		return result[0];
	});
};

exports.create = function(userId, title) {
	return request.songza({
		uri: settings.base + '/collection/user/' + userId + '/create',
		method: 'POST',
		form: { user_id: userId, title: title }
	});
};

// 403 forbidden. Must require elevated privileges.
exports.delete = function(collectionId) {
	return request.songza({
		uri: settings.base + '/collection/delete',
		method: 'POST',
		form: { collection_id: collectionId }
	});
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

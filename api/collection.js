"use strict";

module.exports = function(request, settings) {

	var self = {};

	self.user = function(userId) {
		var uri = settings.base + '/collection/user/' + userId;
		return request.songza(uri);
	};

	self.getById = function(userId, collectionId) {
		return self.user(userId).then(function(userCollection) {
			return userCollection.filter(function(coll) {
				return coll.id === collectionId;
			});
		}).then(function(result) {
			if (result.length === 0) { return void 0; }
			return result[0];
		});
	};

	self.getByTitle = function(userId, collectionTitle) {
		return self.user(userId).then(function(userCollection) {
			return userCollection.filter(function(coll) {
				return coll.title === collectionTitle;
			});
		}).then(function(result) {
			if (result.length === 0) { return void 0; }
			return result[0];
		});
	};

	self.create = function(userId, title) {
		return request.songza({
			uri: settings.base + '/collection/user/' + userId + '/create',
			method: 'POST',
			form: { user_id: userId, title: title }
		});
	};

	// 403 forbidden. Must require elevated privileges.
	self.delete = function(collectionId) {
		return request.songza({
			uri: settings.base + '/collection/delete',
			method: 'POST',
			form: { collection_id: collectionId }
		});
	};


	self.addStation = function(collectionId, stationId) {
		var requestOptions = {
			uri: settings.base + '/collection/' + collectionId + '/add-station',
			method: 'POST',
			form: { station: stationId }
		};

		return request.songza(requestOptions);
	};

	self.removeStation = function(collectionId, stationId) {
		var requestOptions = {
			uri: settings.base + '/collection/' + collectionId + '/remove-station',
			method: 'POST',
			form: { station: stationId }
		};

		return request.songza(requestOptions);
	};

	return self;

};

"use strict";
/* global describe */
/* global it */
/* global before */
/* global after */

var collection = require('../api/collection')
, auth = require('../api/auth')
, user = require('../api/user');

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

describe('collection', function() {

	var userId;

	before(function() {
		return auth.login(process.env.SONGZA_USER, process.env.SONGZA_PASS)
		.then(user.getCurrent)
		.then(function(user) {
			userId = user.id;
		});
	});

	after(function() {
		return auth.logout();
	});

	describe('user', function() {

		it('should get back collection information for a user', function() {
			var promise = collection.user(userId);
			expect(promise).to.eventually.be.instanceof(Array);
			return promise;
		});

		it('throw error, user does not exist', function() {
			return expect(collection.user(1324234234234888880))
			.to.eventually.be.rejectedWith(JSON.stringify({
				error: "no such user"
			}));
		});

	});

	describe('create/delete collections', function() {

		it('should create a collection alright', function() {
			return expect(collection.create(userId, 'test-a'))
				.to.eventually.haveOwnProperty('title', 'test-a');
		});

		it('should delete a collection', function() {
			return collection.getByTitle(userId, 'test-a').then(function(coll) {
				return collection.delete(coll.id);
			}).then(function() {
				return expect(collection.getByTitle(userId, 'test-a'))
					.to.eventually.be.undefined;
			});
		});

	});

	describe('add/remove stations from a collection', function() {

		var collectionId
		, testStation = 1392217;

		before(function() {
			return collection.create(userId, 'test-b').then(function(coll) {
				collectionId = coll.id;
			});
		});

		after(function() {
			return collection.delete(collectionId);
		});

		it('should add a station to our new collection', function() {
			return collection.getByTitle(userId, 'test-b').then(function(coll) {
				expect(coll.station_ids).to.eql([]);
			}).then(function() {
				return collection.addStation(collectionId, testStation);
			}).then(function() {
				return collection.getByTitle(userId, 'test-b');
			}).then(function(coll) {
				expect(coll.station_ids).to.eql([ testStation ]);
			});
		});

		it('should remove a station from our new collection', function() {
			return collection.getByTitle(userId, 'test-b').then(function(coll) {
				expect(coll.station_ids).to.eql([ testStation ]);
			}).then(function() {
				return collection.removeStation(collectionId, testStation);
			}).then(function() {
				return collection.getByTitle(userId, 'test-b');
			}).then(function(coll) {
				expect(coll.station_ids).to.eql([]);
			});
		});
	});

});

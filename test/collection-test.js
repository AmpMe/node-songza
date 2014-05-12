"use strict";
/* global describe */
/* global it */

var collection = require('../api/collection');
var expect = require('chai').expect;

describe('collection', function() {

	describe('user', function() {

		it('should get back collection information for a user', function() {
			return collection.user(10).then(function(result) {
				expect(result).to.eql([
					{ user_id: 10, station_ids: [], id: 296, title: 'My Favorites' },
					{ user_id: 10, station_ids: [], id: 297, title: 'Playlists for Work' },
					{ user_id: 10, station_ids: [], id: 298, title: 'Playlists for Home' }
				]);
			});
		});

		it('throw error, user does not exist', function() {
			return collection.user(1324234234234888880).then(function(result) {
				expect(result).to.eql({
					error: "no such user"
				});
			});
		});

	});

	describe('add-station', function() {
		it.skip('it should work');
	});

	describe('remove-station', function() {
		it.skip('it should work');
	});

});

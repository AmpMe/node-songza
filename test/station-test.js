"use strict";
/* global describe */
/* global it */
/* global beforeEach */

var station = require('../api/station')
, auth = require('../api/auth')
, request = require('../request');

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

describe('station', function() {

	beforeEach(function() {
		return request.clearSession();
	});

	describe('details', function() {

		it('should get details for a station', function() {
			return station.details('1399111').then(function(result) {
				expect(result).to.eql({
					"dasherized_name": "downtempo-instrumentals-tenmillionsounds",
					"status": "NORMAL",
					"global_station": null,
					"name": "Downtempo Instrumentals",
					"creator_name": "Jesse Sussman",
					"url": "http://songza.com/listen/downtempo-instrumentals-tenmillionsounds/",
					"song_count": 66,
					"cover_url": "http://d2t03vq6udg69j.cloudfront.net/api/1/station/1399111/image",
					"featured_artists": [
						{
							"name": "Tycho"
						},
						{
							"name": "Hiatus"
						},
						{
							"name": "Emancipator"
						},
						{
							"name": "Bonobo"
						},
						{
							"name": "Air"
						}
					],
					"creator_id": 1080874,
					"type": "basic",
					"id": 1399111,
					"description": "Hypnotic breaks and pensive soundscapes from today's greatest electronica artists: the perfect soundtrack for reading, working, or just relaxing."
				});
			});
		});

		it('should fail to find station id', function() {
			return station.details('13991987987987981').then(function(result) {
				expect(result).to.eql({
					error: 'no such station (id=13991987987987981)'
				});
			});
		});

	});

	describe('similar', function() {

		it('should work', function() {
			return station.similar('1399111').then(function(result) {
				expect(result instanceof Array).to.equal(true);
			});
		});

		it('should fail to find station id', function() {
			return station.similar('13991987987987981').then(function(result) {
				expect(result).to.eql({
					error: 'no such station (id=13991987987987981)'
				});
			});
		});

	});

	describe('next', function() {

		it('should get the next song in a station', function() {
			return station.next('1399111').then(function(result) {
				expect(typeof result).to.equal('object');
			});
		});

		it('should fail to get the next song in a station', function() {
			return station.next('13991987987987981').then(function(result) {
				expect(result).to.eql({
					error: 'no such station (id=13991987987987981)'
				});
			});
		});

	});

	describe('downvote', function() {

		it('should not work (not logged in)', function() {
			return station.downvote('1393503', '5003159').then(function(result) {
				expect(result).to.eql({
					error: 'not logged in'
				});
			});
		});

		it('should work (logged in)', function() {
			return auth.login(process.env.SONGZA_USER, process.env.SONGZA_PASS)
			.then(function() {
				return station.downvote('1393503', '5003159');
			})
			.then(function(result) {
				expect(result.vote).to.equal('DOWN');
			});
		});

		it('should not work (invalid station id)', function() {
			return auth.login(process.env.SONGZA_USER, process.env.SONGZA_PASS)
			.then(function() {
				return station.downvote('13935039999999', '5003159');
			})
			.then(function(result) {
				expect(result).to.eql({
					error: 'no such station (id=13935039999999)'
				});
			});
		});

		it('should not work (invalid song id)', function() {
			return auth.login(process.env.SONGZA_USER, process.env.SONGZA_PASS)
			.then(function() {
				return station.downvote('1393503', '500399999999159');
			})
			.then(function(result) {
				expect(result).to.eql({
					error: 'no such song (id=500399999999159)'
				});
			});
		});

	});

	describe('upvote', function() {

		it('should not work (not logged in)', function() {
			return station.upvote('1393503', '5003159').then(function(result) {
				expect(result).to.eql({
					error: 'not logged in'
				});
			});
		});

		it('should work (logged in)', function() {
			return auth.login(process.env.SONGZA_USER, process.env.SONGZA_PASS)
			.then(function() {
				return station.upvote('1393503', '5003159');
			})
			.then(function(result) {
				expect(result.vote).to.equal('UP');
			});
		});

		it('should not work (invalid station id)', function() {
			return auth.login(process.env.SONGZA_USER, process.env.SONGZA_PASS)
			.then(function() {
				return station.upvote('13935039999999', '5003159');
			})
			.then(function(result) {
				expect(result).to.eql({
					error: 'no such station (id=13935039999999)'
				});
			});
		});

		it('should not work (invalid song id)', function() {
			return auth.login(process.env.SONGZA_USER, process.env.SONGZA_PASS)
			.then(function() {
				return station.upvote('1393503', '500399999999159');
			})
			.then(function(result) {
				expect(result).to.eql({
					error: 'no such song (id=500399999999159)'
				});
			});
		});

	});

	describe('create', function() {

		it('should create a new station', function() {
			return auth.login(process.env.SONGZA_USER, process.env.SONGZA_PASS)
			.then(function() {
				return station.create('test_station2');
			})
			.then(function(result) {
				expect(result.name).to.equal('test_station2');
				console.log(result); //!!!debug
			});
		});

	});

	describe('update', function() {

		it.skip('should work', function() {
			return station.update().then(function(result) {

			});
		});

	});

	describe('addSong', function() {

		it.skip('should work', function() {
			return station.addSong().then(function(result) {

			});
		});

	});

	describe('songs', function() {

		it.skip('should work', function() {
			return station.songs().then(function(result) {

			});
		});

	});

	describe('stationSong', function() {

		it.skip('should work', function() {
			return station.stationSong().then(function(result) {

			});
		});

	});

	describe('removeSong', function() {

		it.skip('should work', function() {
			return station.removeSong().then(function(result) {

			});
		});

	});

	describe('release', function() {

		it.skip('should work', function() {
			return station.release().then(function(result) {

			});
		});

	});

	describe('unrelease', function() {

		it.skip('should work', function() {
			return station.unrelease().then(function(result) {

			});
		});

	});

	describe('stats', function() {

		it.skip('should work', function() {
			return station.stats().then(function(result) {

			});
		});

	});
});

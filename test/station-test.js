"use strict";
/* global describe */
/* global it */
/* global before */
/* global after */

var station = require('../api/station')
, auth = require('../api/auth')
, user = require('../api/user')
, request = require('../request');

var when = require('when');

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

describe('station', function() {

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

	describe('get', function() {

		it('should get details for a station', function() {
			return expect(station.get('1399111')).to.eventually.eql({
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

		it('should fail to find station id', function() {
			return expect(station.get('13991987987987981'))
				.to.eventually.be.rejectedWith(JSON.stringify({
					error: 'no such station (id=13991987987987981)'
				}));
		});

	});

	describe('getByName', function() {
		it('should get a station by name', function() {
			return expect(station.getByName('ambient-bass-songza'))
				.to.eventually.haveOwnProperty(
					'dasherized_name', 'ambient-bass-songza');
		});
	});

	describe('getByUrl', function() {
		it('should get a station by url', function() {
			return expect(station.getByUrl(
				'http://songza.com/listen/ambient-bass-songza/'
			)).to.eventually.haveOwnProperty(
				'dasherized_name', 'ambient-bass-songza');
		});
	});

	describe('getBatch', function() {
		it('should get multiple stations at once', function() {
			var promise = station.getBatch([1399111, 1409290]);
			return expect(promise)
				.to.eventually.be.instanceof(Array).with.length(2);
		});
	});

	describe('similar', function() {

		it('should find similar songs', function() {
			return expect(station.similar('1399111'))
				.to.eventually.be.instanceof(Array);
		});

		it('should fail to find station id', function() {
			return expect(station.similar('13991987987987981'))
				.to.eventually.be.rejectedWith(JSON.stringify({
					error: 'no such station (id=13991987987987981)'
				}));
		});

	});

	describe('nextSong', function() {

		it('should get the next song in a station', function() {
			return expect(station.nextSong('1399111'))
				.to.eventually.haveOwnProperty('listen_url');
		});

		it('should fail to get the next song in a station', function() {
			return expect(station.nextSong('13991987987987981'))
				.to.eventually.be.rejectedWith(JSON.stringify({
					error: 'no such station (id=13991987987987981)'
				}));
		});

	});

	describe('notifyPlay', function() {

		it('should notify that we have played a song', function() {
			return expect(station.notifyPlay(1708916, 5419075))
				.to.eventually.haveOwnProperty('skippable');
		});

	});

	describe('downvote', function() {

		it('should downvote', function() {
			return expect(station.downvote('1393503', '5003159'))
				.to.eventually.haveOwnProperty('vote', 'DOWN');
		});

		it('should not work (invalid station id)', function() {
			return expect(station.downvote('13935039999999', '5003159'))
				.to.eventually.be.rejectedWith(JSON.stringify({
					error: 'no such station (id=13935039999999)'
				}));
		});

		it('should not work (invalid song id)', function() {
			return expect(station.downvote('1393503', '500399999999159'))
				.to.eventually.be.rejectedWith(JSON.stringify({
					error: 'no such song (id=500399999999159)'
				}));
		});

	});

	describe('upvote', function() {

		it('should work (logged in)', function() {
			return expect(station.upvote('1393503', '5003159'))
				.to.eventually.haveOwnProperty('vote', 'UP');
		});

	});

	describe('create', function() {

		it('should create a new station', function() {
			return expect(station.create('test_station-a'))
				.to.eventually.haveOwnProperty('name', 'test_station-a');
		});

	});

	describe('tests that deal with a single station', function() {

		var stationId;

		before(function() {
			return station.create('test_station-b').then(function(result) {
				stationId = result.id;
			});
		});

		describe('update', function() {
			it('should update a stations details', function() {
				return station.update(stationId, {
					name: 'test_station-b-updated'
				}).then(function(result) {
					expect(result).to.haveOwnProperty('id', stationId);
					expect(result).to.haveOwnProperty(
						'name', 'test_station-b-updated');
				});
			});
		});

		describe('addSong', function() {
			it('should add a song to the station', function() {
				var songId = 28348364; // Snoop
				return station.get(stationId).then(function(info) {

					var oldSongCount = info.song_count;

					return station.addSong(stationId, songId).then(function(addInfo) {
						expect(addInfo.song.artist.name).to.equal('Snoop Dogg');
						return station.get(stationId);
					}).then(function(newInfo) {
						expect(newInfo.song_count).to.equal(oldSongCount + 1);
					});
				});
			});
		});

		describe('songs', function() {
			it('should list the songs in a station', function() {
				console.log(stationId); //!!!debug
				return expect(station.songs(stationId))
					.to.eventually.be.instanceof(Array);
			});
		});

		describe('stationSong', function() {
			it.skip('should update information about a song in a station');
		});

		describe('removeSong', function() {
			it('should remove a song from the station', function() {
				var songId = 20345306; // Billy Joel
				return station.get(stationId).then(function(info) {

					var oldSongCount = info.song_count;

					return station.addSong(stationId, songId).then(function(addInfo) {
						expect(addInfo.song.artist.name).to.equal('Billy Joel');
						return station.get(stationId);
					}).then(function(newInfo) {
						expect(newInfo.song_count).to.equal(oldSongCount + 1);
					}).then(function() {
						return station.removeSong(stationId, songId);
					}).then(function() {
						return station.get(stationId);
					}).then(function(newInfo) {
						expect(newInfo.song_count).to.equal(oldSongCount);
					});

				});
			});
		});

		describe('release', function() {
			it('do not release if not enough songs', function() {
				return station.release(stationId).catch(function(error) {
					var data = JSON.parse(error.message);
					expect(data).to.haveOwnProperty('error', true);
					expect(data.message.indexOf('must have at least 20 songs'))
						.to.not.equal(-1);
				});
			});

			it('do not release if not enough artists', function() {
				this.timeout(60000);

				var songs = [
					// Billy Joel
					12822977,
					304329,
					17060858,
					17032163,
					17032316,

					// Snoop
					28348364,
					20362663,
					20501002,
					16359994,
					16360012,

					// Spears
					4579913,
					4422385,
					4431270,
					4426438,
					21575683,

					// Johann Strauss
					14699171,
					5570598,
					14707589,
					5565781,
					5565782
				];

				return when.map(songs, function(songId) {
					return station.addSong(stationId, songId);
				}).then(function() {
					return station.release(stationId);
				}).catch(function(error) {
					var data = JSON.parse(error.message);

					console.log(data); //!!!debug

					expect(data).to.haveOwnProperty('error', true);
					expect(data.message.indexOf('must have at least 8 artists'))
						.to.not.equal(-1);
				});
			});

			it('should release (meet all requirements)', function() {
				this.timeout(60000);

				var songs = [
					// Billy Joel
					12822977,
					304329,
					17060858,
					17032163,
					17032316,

					// Snoop
					28348364,
					20362663,
					20501002,
					16359994,
					16360012,

					// Spears
					4579913,
					4422385,
					4431270,
					4426438,
					21575683,

					// Johann Strauss
					14699171,
					5570598,
					14707589,
					5565781,
					5565782,

					// Bob Dillon
					17168940,
					// Bethany Dillon
					1724941,
					// Cara Dillon
					2389371,
					// Phyllis Dillon
					3122738
				];

				return when.map(songs, function(songId) {
					return station.addSong(stationId, songId);
				}).then(function() {
					return station.release(stationId);
				}).then(function(result) {
					expect(result).to.haveOwnProperty('success', true);
				});
			});
		});

		describe('unrelease', function() {
			it('should unrelease a station', function() {
				this.timeout(60000);

				var songs = [
					// Billy Joel
					12822977,
					304329,
					17060858,
					17032163,
					17032316,

					// Snoop
					28348364,
					20362663,
					20501002,
					16359994,
					16360012,

					// Spears
					4579913,
					4422385,
					4431270,
					4426438,
					21575683,

					// Johann Strauss
					14699171,
					5570598,
					14707589,
					5565781,
					5565782,

					// Bob Dillon
					17168940,
					// Bethany Dillon
					1724941,
					// Cara Dillon
					2389371,
					// Phyllis Dillon
					3122738
				];

				return when.map(songs, function(songId) {
					return station.addSong(stationId, songId);
				}).then(function() {
					return station.release(stationId);
				}).then(function(result) {
					expect(result).to.haveOwnProperty('success', true);
					return station.unrelease(stationId);
				}).then(function(result) {
					expect(result).to.haveOwnProperty('success', true);
				});
			});
		});

		describe('stats', function() {
			it('should get back stats for a user station', function() {
				return expect(station.stats(stationId, new Date(), new Date()))
					.to.eventually.eql([]);
			});
		});

	});

});

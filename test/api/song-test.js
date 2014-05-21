"use strict";
/* global describe */
/* global it */
/* global before */

var Songza = require('../../Songza');

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;
describe('song', function() {

	var song;

	before(function() {
		var songza = new Songza({ userAgent: 'node-songza/test:song' });
		song = songza.song;
	});

	describe('details', function() {

		it('should return details of a song', function() {
			return expect(song.details('12442598')).to.eventually.eql({
				"album": "Simple Things",
				"artist": {
					"image_url": "http://songza.com/api/1/artist/511ace89e9e23d724def2fd7/image",
					"id": "511ace89e9e23d724def2fd7",
					"name": "Zero 7"
				},
				"external_media": {
					"youtube": {
						"id": "Z0Xcn_OrPq0"
					}
				},
				"title": "Give It Away",
				"cover_url": "http://images.mndigital.com/albums/005/165/437/a.jpeg",
				"genre": "Electronica/Dance",
				"pa": false,
				"formats": [
					{
						"available": true,
						"format": "aac"
					},
					{
						"available": true,
						"format": "mp3"
					}
				],
				"duration": 317,
				"id": 12442598
			});
		});

		it('should an error on unknown song', function() {
			return expect(song.details('fake_song'))
				.to.eventually.be.rejectedWith(JSON.stringify({
					error: "404 Error (Not Found)\n"
				}));
		});

	});

});

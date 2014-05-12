"use strict";
/* global describe */
/* global it */

var song = require('../api/song');
var expect = require('chai').expect;

describe('song', function() {

	describe('details', function() {

		it('should return details of a song', function() {
			return song.details('12442598').then(function(details) {
				expect(details).to.eql({
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
		});

		it('should an error on unknown song', function() {
			return song.details('fake_song').then(function(details) {
				expect(details).to.eql({
					error: "404 Error (Not Found)\n"
				});
			});
		});

	});

});

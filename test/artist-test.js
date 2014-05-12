"use strict";
/* global describe */
/* global it */

var artist = require('../api/artist');
var expect = require('chai').expect;

describe('artist', function() {

	describe('details', function() {

		it('should return details on an artist', function() {
			return artist.details('511ace80e9e23d724def297e').then(function(details) {
				expect(details).to.eql({
					image_url: "http://songza.com/api/1/artist/511ace80e9e23d724def297e/image",
					id: "511ace80e9e23d724def297e",
					name: "Ulrich Schnauss"
				});
			});
		});

		it('should an error on unknown artist', function() {
			return artist.details('fake_artist').then(function(details) {
				expect(details).to.eql({
					error: "no such artist(id=fake_artist)"
				});
			});
		});

	});

});

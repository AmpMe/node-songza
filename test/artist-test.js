"use strict";
/* global describe */
/* global it */

var artist = require('../api/artist');

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

describe('artist', function() {

	describe('details', function() {

		it('should return details on an artist', function() {
			var promise = artist.details('511ace80e9e23d724def297e');
			expect(promise).to.eventually.eql({
				image_url: "http://songza.com/api/1/artist/511ace80e9e23d724def297e/image",
				id: "511ace80e9e23d724def297e",
				name: "Ulrich Schnauss"
			});
			return promise;
		});

		it('should an error on unknown artist', function() {
			var promise = artist.details('fake_artist');

			return expect(promise).to.eventually.be.rejectedWith(JSON.stringify({
				error: 'no such artist(id=fake_artist)'
			}));
		});

	});

	describe('suggest', function() {

		it('should suggest', function() {
			var promise = artist.suggest('snoop');
			expect(promise).to.eventually.be.instanceof(Array)
				.with.deep.property('[0].name', 'Snoop Dogg');
			return promise;
		});

	});

});

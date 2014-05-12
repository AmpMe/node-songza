"use strict";
/* global describe */
/* global it */

var search = require('../api/search');
var expect = require('chai').expect;

describe('search', function() {

	describe('artist', function() {

		it('should return results', function() {
			return search.artist('snoop').then(function(result) {
				expect(result instanceof Array).to.equal(true);
			});
		});

	});

	describe('station', function() {

		it('should return results', function() {
			return search.station('snoop').then(function(result) {
				expect(result instanceof Array).to.equal(true);
			});
		});

	});

	describe('song', function() {

		it('should return a result containing a songs array', function() {
			return search.song('snoop').then(function(result) {
				expect(result.songs instanceof Array).to.equal(true);
			});
		});

	});

	describe('situation', function() {

		it('should return results', function() {
			return search.situation('snoop').then(function(result) {
				expect(result instanceof Array).to.equal(true);
			});
		});

	});

});

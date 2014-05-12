"use strict";
/* global describe */
/* global it */

var situation = require('../api/situation');
var expect = require('chai').expect;

describe('situation', function() {

	describe('targeted', function() {

		it('should return the default results for today', function() {
			return situation.targeted().then(function(result) {
				expect(result instanceof Array).to.equal(true);
				expect(result.length).to.equal(5);
			});
		});

		it('should return results with only 1 situation', function() {
			return situation.targeted(1).then(function(result) {
				expect(result instanceof Array).to.equal(true);
				expect(result.length).to.equal(1);
			});
		});

		it('should return results with only 1 station in a situation', function() {
			return situation.targeted(1, 1).then(function(result) {
				expect(result[0].situations[0].station_ids.length).to.equal(1);
			});
		});

	});

});

"use strict";
/* global describe */
/* global it */

var situation = require('../api/situation');

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

describe('situation', function() {

	describe('getTargeted', function() {

		it('should return the default results for today', function() {
			return situation.getTargeted().then(function(result) {
				expect(result instanceof Array).to.equal(true);
				expect(result.length).to.equal(5);
			});
		});

		it('should return results with only 1 situation', function() {
			return situation.getTargeted({
				maxSituations: 1
			}).then(function(result) {
				expect(result instanceof Array).to.equal(true);
				expect(result.length).to.equal(1);
			});
		});

		it('should return results with only 1 station in a situation', function() {
			return situation.getTargeted({
				maxSituations: 1,
				maxStations: 1
			}).then(function(result) {
				expect(result[0].situations[0].station_ids.length).to.equal(1);
			});
		});

	});

	describe('createTag', function() {
		// admin only
		it.skip('should work');
	});

	describe('create', function() {
		// admin only
		it.skip('should work');
	});

});

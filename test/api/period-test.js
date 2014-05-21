"use strict";
/* global describe */
/* global it */
/* global before */

var Songza = require('../../Songza');

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

describe('period', function() {

	var period;

	before(function() {
		var songza = new Songza({ userAgent: 'node-songza/test:gallery' });
		period = songza.period;
	});

	describe('getNumberFromDate', function() {
		it('should get the correct period for morning', function() {
			var morningDate = new Date(2014, 1, 10, 7, 59, 59);
			var number = period.getNumberFromDate(morningDate);
			return expect(number).to.equal(0);
		});
		it('should get the correct period for late-morning', function() {
			var lateMorningDate = new Date(2014, 1, 10, 11, 59, 59);
			var number = period.getNumberFromDate(lateMorningDate);
			return expect(number).to.equal(1);
		});
		it('should get the correct period for afternoon', function() {
			var afternoonDate = new Date(2014, 1, 10, 15, 59, 59);
			var number = period.getNumberFromDate(afternoonDate);
			return expect(number).to.equal(2);
		});
		it('should get the correct period for evening', function() {
			var eveningDate = new Date(2014, 1, 10, 19, 59, 59);
			var number = period.getNumberFromDate(eveningDate);
			return expect(number).to.equal(3);
		});
		it('should get the correct period for night', function() {
			var nightDate = new Date(2014, 1, 10, 23, 59, 59);
			var number = period.getNumberFromDate(nightDate);
			return expect(number).to.equal(4);
		});
		it('should get the correct period for late-night', function() {
			var lateNightDate = new Date(2014, 1, 10, 3, 59, 59);
			var number = period.getNumberFromDate(lateNightDate);
			return expect(number).to.equal(5);
		});
	});

	describe('getCurrentNumber', function() {
		it('should get the current period', function() {
			return expect(typeof period.getCurrentNumber()).to.equal('number');
		});
	});

	describe('getDescriptionFromDate', function() {
		it ('should get a description for a date', function() {
			var morningDate = new Date(2014, 1, 10, 7, 59, 59);
			var description = period.getDescriptionFromDate(morningDate);
			return expect(description).to.equal("Monday Morning");
		});
	});

	describe('getCurrentDescription', function() {
		it('should get the current description', function() {
			return expect(typeof period.getCurrentDescription())
				.to.equal('string');
		});
	});

});

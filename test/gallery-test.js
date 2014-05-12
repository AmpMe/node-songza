"use strict";
/* global describe */
/* global it */

var gallery = require('../api/gallery');
var expect = require('chai').expect;

describe('gallery', function() {

	describe('tagMoods', function() {

		it('should get the tagMoods', function() {
			return gallery.tagMoods().then(function(result) {
				expect(result[0].tags[0].id).to.equal('moods');
			});
		});

	});

	describe('tagDecades', function() {

		it('should get the tagDecades', function() {
			return gallery.tagDecades().then(function(result) {
				expect(result[0].tags[0].id).to.equal('decades');
			});
		});

	});

	describe('tagGenres', function() {

		it('should get the tagGenres', function() {
			return gallery.tagGenres().then(function(result) {
				expect(result[0].tags[0].id).to.equal('genres');
			});
		});

	});

	describe('tagActivities', function() {

		it('should get the tagActivities', function() {
			return gallery.tagActivities().then(function(result) {
				expect(result[0].tags[0].id).to.equal('activities');
			});
		});

	});


});

"use strict";
/* global describe */
/* global it */
/* global before */

var Songza = require('../../Songza');

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

describe('gallery', function() {

	var gallery;

	before(function() {
		var songza = new Songza({ userAgent: 'node-songza/test:gallery' });
		gallery = songza.gallery;
	});

	describe('get', function() {

		it('should get a gallery by id', function() {
			return expect(gallery.get('_curated-aggressive'))
				.to.eventually.haveOwnProperty('id', '_curated-aggressive');
		});

	});

	describe('getBatch', function() {
		// ? can't seem to get it to work
		it.skip('should work');
	});

	describe('tag', function() {
		it('should get back gallery results based on tags', function() {
			return expect(gallery.tag('moods'))
				.to.eventually.be.instanceof(Array);
		});
	});

	describe('create gallery', function() {
		// admin only
		it.skip('should work');
	});

});

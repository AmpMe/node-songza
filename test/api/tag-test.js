"use strict";
/* global describe */
/* global it */
/* global before */

var Songza = require('../../Songza');

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

describe('tag', function() {

	var tag;

	before(function() {
		var songza = new Songza({ userAgent: 'node-songza/test:tag' });
		tag = songza.tag;
	});

	describe('getAll', function() {
		it('should get all the tags defined', function() {
			return expect(tag.getAll())
				.to.eventually.be.instanceof(Array);
		});
	});

	describe('get', function() {
		it('should get a single tag based on id', function() {
			return expect(tag.get('moods'))
				.to.eventually.haveOwnProperty('id', 'moods');
		});
	});

	describe('createTag', function() {
		it.skip('should create a tag');
	});

});

"use strict";
/* global describe */
/* global it */
/* global before */

var Songza = require('../../Songza');

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

describe('promotion', function() {

	var promotion;

	before(function() {
		var songza = new Songza({ userAgent: 'node-songza/test:promotion' });
		promotion = songza.promotion;
	});

	describe('create', function() {
		// admin only
		it.skip('should create a new promotion');
	});

});

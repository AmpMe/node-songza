"use strict";
/* global describe */
/* global it */

var auth = require('../api/auth');
var expect = require('chai').expect;

describe('auth', function() {

	describe('initSession', function() {

		it.only('should work', function() {
			return auth.initSession().then(function(result) {
			});
		});

	});

	describe.skip('login', function() {

		it('should login sucessfully', function() {
			return auth.login(
				process.env.SONGZA_USER,
				process.env.SONGZA_PASS);
		});

	});

});

"use strict";
/* global describe */
/* global it */

var auth = require('../api/auth')
, user = require('../api/user');

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

describe('auth', function() {

	describe('login', function() {
		it('should login sucessfully', function() {
			return auth.login(
				process.env.SONGZA_USER,
				process.env.SONGZA_PASS)
			.then(user.getCurrent)
			.then(function(user) {
				expect(user.username).to.equal(process.env.SONGZA_USER);
			});
		});
	});

	describe('logout', function() {
		it('should logout', function() {
			return auth.login(
				process.env.SONGZA_USER,
				process.env.SONGZA_PASS)
			.then(auth.logout)
			.then(user.getCurrent)
			.then(function(result) {
				expect(result).to.eql({ username: '',
					website: '',
					about: '',
					display_name: '',
					site: '',
					admin_sites: [],
					black_planet_id: null,
					email: '',
					image_url: 'http://songza.com/api/1/static/images/profiles/default-large.png',
					facebook_id: null,
					images: {
						small: 'http://songza.com/api/1/static/images/profiles/default-large.png',
						large: 'http://songza.com/api/1/static/images/profiles/default-large.png',
						medium: 'http://songza.com/api/1/static/images/profiles/default-large.png',
						square: 'http://songza.com/api/1/static/images/profiles/default-large.png'
					},
					image_default: true,
					id: 0,
					is_admin: false
				});
			});
		});
	});

});

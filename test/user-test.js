"use strict";
/* global describe */
/* global it */
/* global before */
/* global after */

var user = require('../api/user')
, auth = require('../api/auth');

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

describe('user', function() {

	var userId;

	before(function() {
		return auth.login(process.env.SONGZA_USER, process.env.SONGZA_PASS)
		.then(user.getCurrent)
		.then(function(user) {
			userId = user.id;
		});
	});

	after(function() {
		return auth.logout();
	});

	describe('getCurrent', function() {
		it('should get the current users information', function() {
			return user.getCurrent().then(function(info) {
				expect(info.username).to.equal(process.env.SONGZA_USER);
			});
		});
	});

	describe('profile', function() {
		it('should get a user profile', function() {
			return expect(user.profile(userId))
				.to.eventually.haveOwnProperty(
					'username', process.env.SONGZA_USER);
		});
	});

	describe('stations', function() {
		it('should get a users recent stations', function() {
			return expect(user.stations(userId, { created: true }))
				.to.eventually.haveOwnProperty('created');
		});
	});

	describe('follow', function() {
		it('should follow Snoop', function() {
			return expect(user.follow(13167920)).to.eventually.eql({});
		});
	});

	describe('unfollow', function() {
		it('should unfollow Snoop :(', function() {
			return expect(user.unfollow(13167920)).to.eventually.eql({});
		});
	});

	describe('getFollows', function() {
		it('should get the users that we follow', function() {

			// Unfollow Snoop
			return user.unfollow(13167920).then(function() {
				return user.getFollows(userId);
			}).then(function(follows) {
				expect(follows).to.eql([]);
				// Follow Snoop
				return user.follow(13167920);
			}).then(function() {
				return user.getFollows(userId);
			}).then(function(follows) {
				// Ensure that we are following him
				expect(follows[0]).to.haveOwnProperty('username', 'Snoop_Dogg');
			});
		});
	});

	describe('getFollowers', function() {
		it('should get the users that are following us!', function() {
			return expect(user.getFollowers(userId))
				.to.eventually.be.instanceof(Array);
		});
	});

	describe('feed', function() {
		it('should get the users feed', function() {
			return expect(user.feed(userId))
				.to.eventually.haveOwnProperty('items');
		});
	});

});

"use strict";
/* global describe */
/* global it */

var settings = require('../settings');

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

describe('settings', function() {
	it('should demand a user agent', function() {
		return expect(function() {
			settings.get();
		}).to.throw('You must specify a userAgent');
	});

	it('should return default settings', function() {
		return expect(settings.get({ userAgent: 'foo' })).to.eql({
			site: 'songza',
			device: 'web',
			base: 'http://songza.com/api/1',
			userAgent: 'foo'
		});
	});

	it('should override default settings', function() {
		return expect(settings.get({
			site: 'mySite',
			userAgent: 'foo'
		})).to.eql({
			site: 'mySite',
			device: 'web',
			base: 'http://songza.com/api/1',
			userAgent: 'foo'
		});
	});

});

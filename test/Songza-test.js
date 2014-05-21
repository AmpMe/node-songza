"use strict";
/* global describe */
/* global it */

var Songza = require('../Songza');

var chai = require('chai');
var expect = chai.expect;

describe('Songza', function() {

	it('should initialize properly', function() {
		var songza = new Songza({ userAgent: 'node-songza/test:Songza'});

		expect(Object.keys(songza)).to.be.instanceof(Array).with.length(12);

		expect(songza.artist).to.exist;
		expect(songza.auth).to.exist;
		expect(songza.collection).to.exist;
		expect(songza.gallery).to.exist;
		expect(songza.period).to.exist;
		expect(songza.promotion).to.exist;
		expect(songza.search).to.exist;
		expect(songza.situation).to.exist;
		expect(songza.song).to.exist;
		expect(songza.station).to.exist;
		expect(songza.tag).to.exist;
		expect(songza.user).to.exist;
	});

});

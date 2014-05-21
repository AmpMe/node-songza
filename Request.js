"use strict";

var zlib = require('zlib')
, _ = require('lodash')
, when = require('when')
, delay = require('when/delay')
, node = require('when/node')
, through = require('through')
, request = require('request');

module.exports = Request;
function Request(settings) {

	var self = {};

	// maintain a cookie jar to set session cookies / etc.
	// uses https://github.com/goinstant/tough-cookie
	var cookieJar = request.jar();

	self.request = request.defaults({
		jar: cookieJar, // keep cookies in-between request calls, save to cookieJar
		// set a unique user agent to be easily identified by the Songza crew
		headers: {
			'User-Agent': settings.userAgent
		}
	});

	// Sets the session id in the cookie jar - it is required that you call this
	// at least once before some endpoints will function.
	self.initSession = function() {
		// load up Songza's login page to load the sessionid and crsf cookies
		// for use when logging in
		return self.promise('http://songza.com/login');
	};

	self.clearSession = function() {
		cookieJar._jar.store.idx = {};
	};

	self.hasSession = function() {
		return !_.isUndefined(cookieJar._jar.store.idx['songza.com']);
	};

	self.ensureSessionExists = function() {
		return self.hasSession()
			? when.resolve()
			: self.initSession();
	};

	self.getCookieValue = function(site, path, key) {
		return cookieJar._jar.store.idx[site][path][key].value;
	};

	// A request stream that can handle decompression
	self.compressedRequest = function(options) {

		var resultStream = through()
		, req = self.request(options);

		req.on('response', function (res) {
			switch(res.headers['content-encoding']) {
				case 'gzip':
					res.pipe(zlib.createGunzip()).pipe(resultStream);
					break;
				case 'deflate':
					res.pipe(zlib.createInflate()).pipe(resultStream);
					break;
				default:
					res.pipe(resultStream);
			}
		});

		req.on('error', function(err) {
			resultStream.emit('error', err);
		});

		return resultStream;
	};

	self.promise = function(options) {
		return when.promise(function(resolve, reject) {
			self.request(options, function(error, response, body) {
				return error ? reject(error) : resolve(body);
			});
		});
	};




	// Throttle requests to Songza
	var throttle = {
		currentWait: 1,
		delayPerCall: 1000 // wait one seconds per call
	};

	self.songza = function(options) {

		throttle.currentWait += throttle.delayPerCall;

		// Wait for the current wait set
		return delay(throttle.currentWait)

		// Make the request to Songza
		.then(function() {
			return when.promise(function(resolve, reject) {

				var body = ''
				, req = self.compressedRequest(options);

				req.on('error', reject);
				req.on('data', function(chunk) { body += chunk.toString(); });
				req.on('end', function() { return resolve(body); });

			});
		})

		// Get back the response, decrement the currentWait by the
		// delay per call.
		//
		// We also normalize any error messages here and reject the
		// promise if any arise.
		.then(function(body) {

			throttle.currentWait -= throttle.delayPerCall;

			var result;

			try {
				result = JSON.parse(body);
			} catch(error) {
				result = { error: String(body) };
			}

			if (result.success === false) {
				result.error = true;
			}

			if (!_.isUndefined(result.code)) {
				result.error = true;
			}

			if (result.error) {
				throw new Error(JSON.stringify(result));
			}

			return result;
		});
	};

	return self;

}

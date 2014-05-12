"use strict";

var zlib = require('zlib')
, _ = require('lodash')
, when = require('when')
, node = require('when/node')
, through = require('through')
, request = require('request');

// maintain a cookie jar to set session cookies / etc.
// uses https://github.com/goinstant/tough-cookie
var cookieJar = request.jar();

request = request.defaults({
	jar: cookieJar, // keep cookies in-between request calls, save to cookieJar
	// set a unique user agent to be easily identified by the Songza crew
	headers: {
		'User-Agent': 'node-songza API wrapper'
	}
});

module.exports = request;

// Sets the session id in the cookie jar - it is required that you call this
// at least once before some endpoints will function.
module.exports.initSession = function() {
	// load up Songza's login page to load the sessionid and crsf cookies
	// for use when logging in
	return request.promise('http://songza.com/login');
};

module.exports.clearSession = function() {
	cookieJar._jar.store.idx = {};
};

module.exports.hasSession = function() {
	return !_.isUndefined(cookieJar._jar.store.idx['songza.com']);
};

module.exports.ensureSessionExists = function() {
	return module.exports.hasSession()
		? when.resolve()
		: module.exports.initSession();
};

module.exports.getCookieValue = function(site, path, key) {
	return cookieJar._jar.store.idx[site][path][key].value;
};

// A request stream that can handle decompression
module.exports.compressedRequest = function(options) {

	var resultStream = through()
	, req = request(options);

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

module.exports.promise = function(options) {
	return when.promise(function(resolve, reject) {
		request(options, function(error, response, body) {
			return error ? reject(error) : resolve(body);
		});
	});
};

module.exports.songza = function(options) {

	return when.promise(function(resolve, reject) {

		var body = ''
		, req = module.exports.compressedRequest(options);

		req.on('error', reject);
		req.on('data', function(chunk) { body += chunk.toString(); });
		req.on('end', function() { return resolve(body); });

	}).then(function(body) {

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

		return result;
	});
};

"use strict";

var querystring = require('querystring')
, when = require('when')
, _ = require('lodash')
, request = require('../request')
, settings = require('../settings');

exports.get = function(stationId) {
	var uri = settings.base + '/station/' + stationId;
	return request.songza(uri);
};

exports.getByName = function(stationName) {
	return request.songza(settings.base + '/station/dname/' + stationName);
};

exports.getByUrl = function(url) {
	var match = url.match(/.*\/station\/(\d+)\/?$/);
	if (match) {
		return exports.get(parseInt(match[1], 10));
	}

	match = url.match(/.*\/listen\/([^\/]+)\/?$/);
	if (match) {
		return exports.getByName(match[1]);
	}

	return when.reject(new Error('Unable to station from URL ' + url));
};

exports.getBatch = function(stationIds) {
	return request.songza(
		settings.base + '/station/multi' +
		'?' + querystring.stringify({ id: stationIds })
	);
};

exports.similar = function(stationId) {
	var uri = settings.base + '/station/' + stationId + '/similar';
	return request.songza(uri);
};

exports.nextSong = function(stationId, format, buffer, coverSize) {
	var options = {
		uri: settings.base + '/station/' + stationId + '/next',
		method: 'POST',
		form: {
			format: format || 'aac',
			buffer: buffer || 0,
			cover_size: coverSize || 'g'
		}
	};

	return request.songza(options);
};

exports.notifyPlay = function(stationId, songId, skip) {
	skip = skip || false;
	return request.songza({
		uri: settings.base +
			'/station/' + stationId +
			'/song/' + songId +
			'/notify-play',
		method: 'POST',
		form: { skip: skip ? 1 : 0 }
	});
};

exports.notifySkip = function(stationId, songId) {
	return exports.notifyPlay(stationId, songId, 1);
};

// I'm not sure what this endpoint is for yet
exports.listen = function(stationId) {
	return request.songza({
		uri: settings.base + '/station/' + stationId + '/listen',
		method: 'POST'
	});
};

exports.downvote = function(stationId, songId) {
	return request.songza({
		uri: settings.base +
			'/station/' + stationId + '/song/' + songId + '/vote/down',
		method: 'POST'
	});
};

exports.upvote = function(stationId, songId) {
	return request.songza({
		uri: settings.base +
			'/station/' + stationId + '/song/' + songId + '/vote/up',
		method: 'POST'
	});
};

exports.create = function(stationName) {
	var options = {
		uri: settings.base + '/station/create',
		method: 'POST',
		body: JSON.stringify({
			name: stationName
		})
	};

	return request.songza(options);
};

exports.update = function(stationId, options) {
	options = options || {};
	return exports.get(stationId).then(function(details) {
		details = details || {};
		var requestOptions = {
			uri: settings.base + '/station/' + stationId,
			method: 'PUT',
			body: JSON.stringify({
				status: details.status,
				genres: [],
				name: options.name || details.name,
				dasherized_name: options.dasherized_name || details.dasherized_name,
				global_station: options.global_station || details.global_station,
				creator_name: details.creator_name,
				url: details.url,
				song_count: details.song_count,
				cover_url: options.cover_url || details.cover_url,
				featured_artists: [],
				creator_id: details.creator_id,
				type: details.type,
				id: stationId,
				description: options.description || details.description,
				notes: options.notes || details.notes
			})
		};

		return request.songza(requestOptions);
	});
};

exports.addSong = function(stationId, songId) {
	var options = {
		uri: settings.base + '/station/' + stationId + '/songs/add',
		method: 'POST',
		form: { song_id: songId }
	};

	return request.songza(options);
};

exports.songs = function(stationId) {
	var uri = settings.base + '/station/' + stationId + '/songs';
	return request.songza(uri);
};

exports.stationSong = function(stationId, songId, options) {
	return exports.songs(stationId).then(function(stationSongs) {
		// pull out the song from the list
		var song = stationSongs.filter(function(single) {
			return single.song.id === songId;
		});

		if (!song || song.length === 0) {
			throw new Error('The song id provided does not exist in station');
		}

		song = song[0]; // pull out the existing song information
		song = _.merge(song, options); // overlay our options

		var requestOptions = {
			uri: settings.base + '/station-song/' + stationId + '-' + songId,
			method: 'PUT',
			body: JSON.stringify(song)
		};

		return request.songza(requestOptions);
	});
};

exports.removeSong = function(stationId, songId) {
	return exports.stationSong(stationId, songId, { deleted: true });
};

exports.release = function(stationId, released) {
	released = typeof released === 'undefined' ? 1 : 0;
	return request.songza({
		uri: settings.base + '/station/' + stationId + '/release',
		method: 'POST',
		form: { released: released }
	});
};

exports.unrelease = function(stationId) {
	return exports.release(stationId, 0);
};

exports.stats = function(stationId, startDate, endDate) {

	// Songza accepts the date in this format
	function formatDate(jsDate) {
		return (
			jsDate.getUTCFullYear() + '-' +
			(jsDate.getUTCMonth() + 1) + '-' +
			jsDate.getUTCDate()
		);
	}

	var options = {
		uri: settings.base + '/station/' + stationId + '/stats',
		qs: {
			start_date: formatDate(startDate),
			end_date: formatDate(endDate)
		}
	};

	return request.songza(options);
};

// 403 Forbidden
exports.uploadImage = function() {};
exports.deleteImage = function() {};

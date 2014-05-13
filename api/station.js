"use strict";

var _ = require('lodash')
, request = require('../request')
, settings = require('../settings');

exports.details = function(stationId) {
	var uri = settings.base + '/station/' + stationId;
	return request.songza(uri);
};

exports.similar = function(stationId) {
	var uri = settings.base + '/station/' + stationId + '/similar';
	return request.songza(uri);
};

exports.next = function(stationId, format, buffer, coverSize) {
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
	return exports.details(stationId).then(function(details) {
		details = details || {};
		var requestOptions = {
			uri: settings.base + '/station/' + stationId,
			method: 'POST',
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
	released = released || 1;
	return request({
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

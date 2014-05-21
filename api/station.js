"use strict";

var querystring = require('querystring')
, when = require('when')
, _ = require('lodash');

module.exports = function(request, settings) {

	var self = {};

	self.get = function(stationId) {
		var uri = settings.base + '/station/' + stationId;
		return request.songza(uri);
	};

	self.getByName = function(stationName) {
		return request.songza(settings.base + '/station/dname/' + stationName);
	};

	self.getByUrl = function(url) {
		var match = url.match(/.*\/station\/(\d+)\/?$/);
		if (match) {
			return self.get(parseInt(match[1], 10));
		}

		match = url.match(/.*\/listen\/([^\/]+)\/?$/);
		if (match) {
			return self.getByName(match[1]);
		}

		return when.reject(new Error('Unable to station from URL ' + url));
	};

	self.getBatch = function(stationIds) {
		return request.songza(
			settings.base + '/station/multi' +
			'?' + querystring.stringify({ id: stationIds })
		);
	};

	self.similar = function(stationId) {
		var uri = settings.base + '/station/' + stationId + '/similar';
		return request.songza(uri);
	};

	self.nextSong = function(stationId, format, buffer, coverSize) {
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

	// http://songza.com/api/1/station/1708916/song/5419075/notify-play
	self.notifyPlay = function(stationId, songId, skip) {
		skip = typeof skip === 'undefined' ? false : true;
		return request.songza({
			uri: settings.base +
				'/station/' + stationId +
				'/song/' + songId +
				'/notify-play',
			method: 'POST',
			form: { skip: skip ? 1 : 0 }
		});
	};

	self.notifySkip = function(stationId, songId) {
		return self.notifyPlay(stationId, songId, 1);
	};

	// I'm not sure what this endpoint is for yet
	self.listen = function(stationId) {
		return request.songza({
			uri: settings.base + '/station/' + stationId + '/listen',
			method: 'POST'
		});
	};

	self.downvote = function(stationId, songId) {
		return request.songza({
			uri: settings.base +
				'/station/' + stationId + '/song/' + songId + '/vote/down',
			method: 'POST'
		});
	};

	self.upvote = function(stationId, songId) {
		return request.songza({
			uri: settings.base +
				'/station/' + stationId + '/song/' + songId + '/vote/up',
			method: 'POST'
		});
	};

	self.create = function(stationName) {
		var options = {
			uri: settings.base + '/station/create',
			method: 'POST',
			body: JSON.stringify({
				name: stationName
			})
		};

		return request.songza(options);
	};

	self.update = function(stationId, options) {
		options = options || {};
		return self.get(stationId).then(function(details) {
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

	self.addSong = function(stationId, songId) {
		var options = {
			uri: settings.base + '/station/' + stationId + '/songs/add',
			method: 'POST',
			form: { song_id: songId }
		};

		return request.songza(options);
	};

	self.songs = function(stationId) {
		var uri = settings.base + '/station/' + stationId + '/songs';
		return request.songza(uri);
	};

	self.stationSong = function(stationId, songId, options) {
		return self.songs(stationId).then(function(stationSongs) {
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

	self.removeSong = function(stationId, songId) {
		return self.stationSong(stationId, songId, { deleted: true });
	};

	self.release = function(stationId, released) {
		released = typeof released === 'undefined' ? 1 : 0;
		return request.songza({
			uri: settings.base + '/station/' + stationId + '/release',
			method: 'POST',
			form: { released: released }
		});
	};

	self.unrelease = function(stationId) {
		return self.release(stationId, 0);
	};

	self.stats = function(stationId, startDate, endDate) {

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
	self.uploadImage = function() {};
	self.deleteImage = function() {};

	return self;

};


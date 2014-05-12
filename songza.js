"use strict";

var request = require('./request');

exports.artist = require('./api/artist');
exports.collection = require('./api/collection');
exports.gallery = require('./api/gallery');
exports.search = require('./api/search');
exports.situation = require('./api/situation');
exports.song = require('./api/song');
exports.station = require('./api/station');
exports.tags = require('./api/tags');
exports.user = require('./api/user');

exports.init = 
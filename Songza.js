"use strict";

var Request = require('./Request')
, settings = require('./settings');

module.exports = Songza;
function Songza(userSettings) {

	var songzaSettings = settings.get(userSettings);
	var request = new Request(songzaSettings);

	this.artist = require('./api/artist')(request, songzaSettings);
	this.auth = require('./api/auth')(request, songzaSettings);
	this.collection = require('./api/collection')(request, songzaSettings);
	this.gallery = require('./api/gallery')(request, songzaSettings);
	this.period = require('./api/period')(request, songzaSettings);
	this.promotion = require('./api/promotion')(request, songzaSettings);
	this.search = require('./api/search')(request, songzaSettings);
	this.situation = require('./api/situation')(request, songzaSettings);
	this.song = require('./api/song')(request, songzaSettings);
	this.station = require('./api/station')(request, songzaSettings);
	this.tag = require('./api/tag')(request, songzaSettings);
	this.user = require('./api/user')(request, songzaSettings);
}

# API Documentation

```javascript
var Songza = require('songza');

var songza = new Songza({ userAgent: 'myApp/v0.0.1' });
```

The API calls are documented below. Their parameters, and return types are indicated. Most calls return promises for values.

It is also worth noting that the API handles throttling internally at a rate of one request per second.

- - -

 - [Artist](#artist)
   - songza.artist.details(artistId)
   - songza.artist.suggest(name [, number])
 - [Auth](#auth)
   - songza.auth.login(username, password)
   - songza.auth.logout()
 - [Collection](#collection)
   - songza.collection.user(userId)
   - songza.collection.getById(userId, collectionId)
   - songza.collection.getByTitle(userId, collectionTitle)
   - songza.collection.create(userId, collectionTitle)
   - songza.collection.delete(collectionId)
   - songza.collection.addStation(collectionId, stationId)
   - songza.collection.removeStation(collectionId, stationId)
 - [Gallery](#gallery)
   - songza.gallery.get(galleryId)
   - songza.gallery.tag(galleryId)
 - [Period](#period)
   - songza.period.getNumberFromDate(date)
   - songza.period.getCurrentNumber()
   - songza.period.getDescriptionFromDate(date)
   - songza.period.getCurrentDescription()
 - [Search](#search)
   - songza.search.artist(query [, limit])
   - songza.search.station(query [, limit])
   - songza.search.song(query [, limit])
   - songza.search.situation(query [, limit])
   - songza.search.gallery(query [, limit])
 - [Situation](#situation)
   - songza.situation.getTargeted(options)
 - [Song](#song)
   - songza.song.details(songId)
 - [Station](#station)
   - songza.station.get(stationId)
   - songza.station.getByName(stationName)
   - songza.station.getByUrl(url)
   - songza.station.getBatch(stationIds)
   - songza.station.similar(stationId)
   - songza.station.nextSong(stationId [, format [, buffer [, coverSize]]])
   - songza.station.notifyPlay(stationId, songId, skip)
   - songza.station.notifySkip(stationId, songId)
   - songza.station.listen(stationId)
   - songza.station.downvote(stationId, songId)
   - songza.station.upvote(stationId, songId)
   - songza.station.create(stationName)
   - songza.station.update(stationId, options)
   - songza.station.addSong(stationId, songId)
   - songza.station.songs(stationId)
   - songza.station.stationSong(stationId, songId, options)
   - songza.station.removeSong(stationId, songId)
   - songza.station.release(stationId, released)
   - songza.station.unrelease(stationId)
   - songza.station.stats(stationId, startDate, endDate)
 - [Tag](#tag)
   - songza.tag.getAll([ featured ])
   - songza.tag.get(tagId)
 - [User](#user)
   - songza.user.getCurrent()
   - songza.user.profile(userId)
   - songza.user.stations(userId, options)
   - songza.user.follow(userId)
   - songza.user.unfollow(userId)
   - songza.user.getFollows(userId)
   - songza.user.getFollowers(userId)
   - songza.user.feed(userId)

## Artist

### songza.artist.details(artistId)

Return: Promise for Object

```javascript
{ image_url: '...', id: '...', name: 'Artist Name' }
```

### songza.artist.suggest(name [, number])

Return: Promise for Array

A collection of suggested artists based on the name given.

## Auth

Some routes require that a user is logged in. If you want to get the users information after logging in, call `songza.user.getCurrent`.

### songza.auth.login(username, password)

Return: Promise (no value returned)

Username must be an email address or the username used when signing up.

### songza.auth.logout()

Return: (no value returned)

Clears the current session.

## Collection

A collection is a group of stations.

The main collection that is typically used is the "Favorites" collection that is populated when a user stars / unstars stations on the GUI. To tie into this, use the existing station that a user has.

Sometimes a user may have more than one collection, and the "Favorites" collection may not be named the same user to user.

### songza.collection.user(userId)

Return: Promise for Array

Get collections for this user. A new user will have no collections.

### songza.collection.getById(userId, collectionId)

Return: Promise for Object

Get information about a specific collection from the collection id.

### songza.collection.getByTitle(userId, collectionTitle)

Return: Promise for Object

Get information about a specific collection from the collection title.

### songza.collection.create(userId, collectionTitle)

Return Promise for Object

Create a new collection, and get information about it (such as the collections id).

### songza.collection.delete(collectionId)

Return: Promise (no value returned)

Deletes the given collection based on id.

### songza.collection.addStation(collectionId, stationId)

Return: Promise (no value returned)

Adds a station to a collection.

### songza.collection.removeStation(collectionId, stationId)

Return: Promise (no value returned)

Removes a station from a collection.

## Gallery

### songza.gallery.get(galleryId)

Return: Promise for Object

### songza.gallery.tag(galleryId)

Return: Promise for Array

Returns back galleries based on tags. Call `songza.tag.getAll` for a list of all tags that are available for use.

## Period

### songza.period.getNumberFromDate(date)

Return: Number

Gets back a number (based on date) that represents the time of day. Can be used to specify a specific time period when calling `situation.getTargeted()`.

### songza.period.getCurrentNumber()

Return: Number

Gets back a number that represents the current time of day. Used when calling `situation.getTargeted()` to return results based on the current time.

### songza.period.getDescriptionFromDate(date)

Return: String

A description for a given date such as "Monday Morning".

### songza.period.getCurrentDescription()

Return: String

A description for the current date such as "Friday Late Night".

## Search

Search for things on Songza.

### songza.search.artist(query [, limit])

Return: Promise for Array

### songza.search.station(query [, limit])

Return: Promise for Array

### songza.search.song(query [, limit])

Return: Promise for Object

This route is the only different one. It returns an object that contains a property `songs` which is an array of results.

### songza.search.situation(query [, limit])

Return: Promise for Array

### songza.search.gallery(query [, limit])

Return: Promise for Array

## Situation

### songza.situation.getTargeted(options)

Defaults:

```javascript
options = {
	maxSituations: 5,
	maxStations: 3,
	currentDate: new Date() // e.g. current time
}
```

Return: Promise for Array

Retrieves the data that is used to make the initial page on Songza.

## Song

### songza.song.details(songId)

Return: Promise for Object

Get various information about a song.

## Station

### songza.station.get(stationId)

Return: Promise for Object

### songza.station.getByName(stationName)

Return: Promise for Object

### songza.station.getByUrl(url)

Return: Promise for Object

### songza.station.getBatch(stationIds)

Return: Promise for Object

### songza.station.similar(stationId)

Return: Promise for Object

### songza.station.nextSong(stationId, format, buffer, coverSize)

Return: Promise for Object

### songza.station.notifyPlay(stationId, songId, skip)

Return: Promise for Object

### songza.station.notifySkip(stationId, songId)

Return: Promise for Object

### songza.station.listen(stationId)

Return: Promise for Object

### songza.station.downvote(stationId, songId)

Return: Promise for Object

### songza.station.upvote(stationId, songId)

Return: Promise for Object

### songza.station.create(stationName)

Return: Promise for Object

### songza.station.update(stationId, options)

Return: Promise for Object

### songza.station.addSong(stationId, songId)

Return: Promise (no value returned)

### songza.station.songs(stationId)

Return: Promise for Object

### songza.station.stationSong(stationId, songId, options)

Return: Promise for Object

### songza.station.removeSong(stationId, songId)

Return: Promise (no value returned)

### songza.station.release(stationId, released)

Return: Promise for Object

### songza.station.unrelease(stationId)

Return: Promise for Object

### songza.station.stats(stationId, startDate, endDate)

Return: Promise for Object

## Tag

### songza.tag.getAll([ featured ])

Defaults: `featured = true`
Return: Promise for Array

Returns a list of all tag information that can be used for this API.

### songza.tag.get(tagId)

Return: Promise for Object

Get specific information for a tag.

## User

### songza.user.getCurrent()

Return: Promise for Object

Get the current authenticated user. If no user is logged in, the id is set to 0.

### songza.user.profile(userId)

Return: Promise for Object

Gets a user profile based on the id given.

### songza.user.stations(userId, options)

Return: Promise for Object

Gets the stations for a user. This will only work when the userid matched the authenticated user's id.

### songza.user.follow(userId)

Return: Promise for Object

The authenticated user will follow the given userId.

### songza.user.unfollow(userId)

Return: Promise for Object

The authenticated user will unfollow the given userId.

### songza.user.getFollows(userId)

Return: Promise for Array

Get a list of users that this user follows

### songza.user.getFollowers(userId)

Return: Promise for Array

Get a list of users that follow this user.

### songza.user.feed(userId)

Return: Promise for Object

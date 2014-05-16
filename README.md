# songza

An API wrapper for [Songza](http://songza.com/).

```
npm install songza
```

- - -

View the tests for examples / routes that are available.

Many calls such as `user.getCurrent` require login first:

```javascript

var songza = require('songza');

songza.auth.login('username', 'password')
.then(songza.user.getCurrent)
.done(function(userInfo) {
	console.log(userInfo);
});
```

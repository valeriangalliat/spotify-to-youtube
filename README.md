# Spotify to YouTube [![npm version](http://img.shields.io/npm/v/spotify-to-youtube.svg?style=flat-square)](https://www.npmjs.org/package/spotify-to-youtube)

> You give a Spotify song, you get a YouTube song.

## Overview

From a Spotify track URI (or just the ID, or a whole Spotify API track
object if you already have one handy), do a YouTube Music search and
return my uneducated guess of what would be the best match amongst the
results (see code for details).

I might tweak that logic without warning.

## Installation

Note that this package depends on an authenticated instance of
[spotify-web-api-node] that you need to inject.

[spotify-web-api-node]: https://github.com/thelinmichael/spotify-web-api-node

```sh
npm install spotify-to-youtube spotify-web-api-node
```

## Usage

```js
const SpotifyToYoutube = require('spotify-to-youtube')
const SpotifyWebApi = require('spotify-web-api-node')

async function main () {
  const spotifyApi = new SpotifyWebApi({
    clientId: '...',
    clientSecret: '...'
  })

  const credsResponse = await spotifyApi.clientCredentialsGrant()

  spotifyApi.setAccessToken(credsResponse.body['access_token'])

  const spotifyToYoutube = SpotifyToYoutube(spotifyApi)

  const id = await spotifyToYoutube('spotify:track:3djNBlI7xOggg7pnsOLaNm')
  console.log(id) // J7_bMdYfSws
}

main()
```

You could also pass just the track ID instead of the URI:

```js
const id = await spotifyToYoutube('3djNBlI7xOggg7pnsOLaNm')
console.log(id) // J7_bMdYfSws
```

Or even the whole track object as returned by the Spotify API, then the
function won't need to make any call to the Spotify API.

Also if you pass an array, it'll just work, and you'll get an array back.

## Development

To run the tests, you need to configure your [Spotify cookie](https://github.com/valeriangalliat/spotify-buddylist#sp_dc-cookie)
in `config.test.json`.

```sh
cp config.test.sample.json config.test.json
```

Then edit `config.test.json` to add your `spDcCookie`.

You can now run tests with:

```sh
npm test
```

**Note:** the tests hit the live servers, requests are not mocked. This
means they're going to fail if YouTube returns different results, and
will need to be updated accordingly.

For example it seems that YouTube Music likes to re-upload songs on the
same channel with the same title but a different ID. Go figure out why. 🤷

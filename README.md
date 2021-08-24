# Spotify to YouTube

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

// If you have API credentials
const spotifyApi = new SpotifyWebApi({
  clientId: '...',
  clientSecret: '...',
  redirectUri: '...'
})

// If you already have an access token
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken('...')

const spotifyToYoutube = SpotifyToYoutube(spotifyApi)

async function main () {
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

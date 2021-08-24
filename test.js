const assert = require('assert')
const SpotifyWebApi = require('spotify-web-api-node')
const buddyList = require('spotify-buddylist')
const SpotifyToYoutube = require('./')
const config = require('./config.test')

const spotifyApi = new SpotifyWebApi()
const spotifyToYoutube = SpotifyToYoutube(spotifyApi)

async function main () {
  if (!config.spDcCookie) {
    throw new Error('Missing `spDcCookie` in `config.test.json`')
  }

  console.error('Fetching access token...')
  const { accessToken } = await buddyList.getWebAccessToken(config.spDcCookie)
  spotifyApi.setAccessToken(accessToken)

  console.error('Converting track...')
  const id = await spotifyToYoutube('spotify:track:3djNBlI7xOggg7pnsOLaNm')

  assert.strictEqual(id, 'LRt6TdSvHag')
  console.error('Success!')
}

main()

const YoutubeMusicApi = require('youtube-music-api')

function SpotifyToYoutube (spotifyApi) {
  const youtubeApi = new YoutubeMusicApi()
  let youtubeInitialized = false

  return async function spotifyToYoutube (urisOrIdsOrTracks, options = {}) {
    if (!Array.isArray(urisOrIdsOrTracks)) {
      return (await spotifyToYoutube([urisOrIdsOrTracks], options))[0]
    }

    if (!options.raw) {
      return (await spotifyToYoutube(urisOrIdsOrTracks, Object.assign({}, options, { raw: true }))).map(track => track.videoId)
    }

    if (typeof urisOrIdsOrTracks[0] === 'string') {
      const ids = urisOrIdsOrTracks.map(uriOrId => uriOrId.includes(':') ? uriOrId.split(':').pop() : uriOrId)
      const { tracks } = (await spotifyApi.getTracks(ids)).body

      return spotifyToYoutube(tracks, options)
    }

    if (!youtubeInitialized) {
      await youtubeApi.initalize()
      youtubeInitialized = true
    }

    return Promise.all(urisOrIdsOrTracks.map(async track => {
      const { content } = await youtubeApi.search(`${track.artists.map(artist => artist.name).join(' ')} ${track.name}`)

      const songsAndVideos = content.filter(track => track.type === 'song' || track.type === 'video')

      if (songsAndVideos.length < 1) {
        return null
      }

      if (songsAndVideos.length === 1) {
        return songsAndVideos[0]
      }

      if (songsAndVideos[0].type === 'song') {
        return songsAndVideos[0]
      } else if (songsAndVideos[1].type === 'song') {
        return songsAndVideos[1]
      } else {
        return songsAndVideos[0]
      }
    }))
  }
}

module.exports = SpotifyToYoutube

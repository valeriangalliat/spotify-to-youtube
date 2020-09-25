const YoutubeMusicApi = require('youtube-music-api')

function SpotifyToYoutube (spotifyApi) {
  const youtubeApi = new YoutubeMusicApi()
  let youtubeInitialized = false

  return async function spotifyToYoutube (urisOrIdsOrTracks) {
    if (!Array.isArray(urisOrIdsOrTracks)) {
      return (await spotifyToYoutube([urisOrIdsOrTracks]))[0]
    }

    if (typeof urisOrIdsOrTracks[0] === 'string') {
      const ids = urisOrIdsOrTracks.map(uriOrId => uriOrId.includes(':') ? uriOrId.split(':').pop() : uriOrId)
      const { tracks } = (await spotifyApi.getTracks(ids)).body

      return spotifyToYoutube(tracks)
    }

    if (!youtubeInitialized) {
      await youtubeApi.initalize()
      youtubeInitialized = true
    }

    return Promise.all(urisOrIdsOrTracks.map(async track => {
      const { content } = await youtubeApi.search(`${track.artists.map(artist => artist.name).join(' ')} ${track.name}`)

      if (content[0].type === 'song') {
        return content[0].videoId
      } else if (content[1].type === 'song') {
        return content[1].videoId
      } else if (content[0].type === 'video') {
        return content[0].videoId
      } else {
        const match = content.find(track => track.type === 'song' || track.type === 'video')

        if (!match) {
          return null
        }

        return match.videoId
      }
    }))
  }
}

module.exports = SpotifyToYoutube

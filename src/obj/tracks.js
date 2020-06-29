export default class filter_tracks {
  constructor({
    song_id,
    song_name,
    song_picUrl,
    songer_id,
    songer_name,
    album_id
  }) {
    this.song_id = song_id
    this.song_name = song_name
    this.song_picUrl = song_picUrl
    this.songer_id = songer_id
    this.songer_name = songer_name
    this.album_id = album_id
    this.url = null
  }
  setUrl(url) {
    this.url = url
  }
  getLyric() {}
}

export function create_filter_tracks(id, name, al, ar) {
  return new filter_tracks({
    song_id: id,
    song_name: name,
    songer_id: ar.id,
    songer_name: ar.name,
    album_id: al.id,
    song_picUrl: al.picUrl
  })
}

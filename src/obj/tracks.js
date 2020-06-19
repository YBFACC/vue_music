export default class filter_tracks {
  constructor(al, ar) {
    this.song_id = al.id
    this.song_name = al.name
    this.song_picUrl = al.picUrl
    this.songer_id = ar.id
    this.songer_name = ar.name
    this.url = null
  }
  add_songUrl(url) {
    this.url = url
  }
}

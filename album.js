class Album {
  constructor(title, artist, played = false) {
    this._title = title;
    this._artist = artist;
    this._played = played;
  }

  get title() {
    return this._title;
  }

  get artist() {
    return this._artist;
  }

  get played() {
    return this._played;
  }

  set played(boolValue) {
    this._played = boolValue;
    return this._played;
  }

  showPlayedStatus() {
    return this._played ? '(played)' : '(unplayed)';
  }
}

module.exports = Album;

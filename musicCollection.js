/* eslint-disable class-methods-use-this */
const _ = require('lodash');

const Album = require('./album');

class MusicCollection {
  constructor() {
    this._albums = [];
  }

  set albums(albums) {
    this._albums = albums;
  }

  get albums() {
    return this._albums;
  }

  addAlbum(title, artist) {
    const filterResult = this._albums.filter(album => album.title === title);
    if (filterResult.length > 0) {
      const error = Error('That album title already exists in the collection');
      console.log(error.message);
      return error;
    }
    const album = new Album(title, artist);
    this.albums.push(album);
    console.log(`Added "${title}" by ${artist}`);
    return album;
  }

  showAll() {
    const albums = this._albums;
    this.displayAlbumsAndPlayedStatus(albums);
    return albums;
  }

  play(title) {
    const foundAlbum = this._albums.find(album => album.title === title);
    if (!foundAlbum) {
      const error = new Error('That album does not exist in the collection');
      console.log(error.message);
      return error;
    }
    foundAlbum.played = true;
    console.log(`You're listening to "${foundAlbum.title}"`);
    return foundAlbum;
  }

  showUnplayed() {
    const unplayed = this._albums.filter(album => !album.played);
    if (unplayed.length === 0) {
      const error = new Error('There are no unplayed albums in the collection.');
      console.log(error.message);
      return error;
    }
    this.displayAlbums(unplayed);
    return unplayed;
  }

  showAllByArtist(artist) {
    const albums = this._albums.filter(album => album.artist === artist);
    if (albums.length === 0) {
      const error = new Error(`There are no albums by ${artist} in the collection.`);
      console.log(error.message);
      return error;
    }
    this.displayAlbumsAndPlayedStatus(albums);
    return albums;
  }

  showUnplayedByArtist(artist) {
    const unplayed = this._albums.filter(album => album.artist === artist && !album.played);
    if (unplayed.length === 0) {
      const error = new Error(`There are no unplayed albums by ${artist} in the collection.`);
      console.log(error.message);
      return error;
    }
    this.displayAlbums(unplayed);
    return unplayed;
  }

  displayAlbums(albums) {
    albums.forEach(album => console.log(`${album.title} by ${album.artist}`));
  }

  displayAlbumsAndPlayedStatus(albums) {
    albums.forEach(album => console.log(`${album.title} by ${album.artist} ${album.showPlayedStatus()}`));
  }

  processFirstArg(input) {
    const argWithQuotes = input.match(/"(.*?)"/g)[0];
    return argWithQuotes.substring(1, argWithQuotes.length - 1);
  }

  processSecondArg(input) {
    const argWithQuotes = input.match(/"(.*?)"/g)[1];
    return argWithQuotes.substring(1, argWithQuotes.length - 1);
  }
}

module.exports = MusicCollection;

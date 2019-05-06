const MusicCollection = require('./musicCollection');
const Album = require('./album');

describe('MusicCollection', () => {
  let music;
  let loadedMusic;
  let downToEartha;
  let thatBadEartha;
  let thursdaysChild;
  let aja;
  let loadedAlbums;
  beforeEach(() => {
    music = new MusicCollection();
    downToEartha = new Album('Down to Eartha', 'Eartha Kitt', true);
    thatBadEartha = new Album('That Bad Eartha', 'Eartha Kitt', true);
    thursdaysChild = new Album('Thursdays Child', 'Eartha Kitt');
    aja = new Album('Aja', 'Steely Dan', true);
    loadedAlbums = [downToEartha, thatBadEartha, thursdaysChild, aja];
    loadedMusic = new MusicCollection();
    loadedMusic.albums = loadedAlbums;
  });

  test('it initializes with no albums in memory', () => {
    music = new MusicCollection();
    expect(music.albums.length).toEqual(0);
  });

  test('addAlbum increases the length of albums by one', () => {
    const prevLength = music.albums.length;
    music.addAlbum('Licensed to Ill', 'Beastie Boys');
    const newLength = music.albums.length;
    expect(newLength - prevLength).toEqual(1);
  });

  test('addAlbum returns the album that was added', () => {
    const result = music.addAlbum('Pauls Boutique', 'Beastie Boy');
    expect(result).toBeInstanceOf(Album);
    expect(result.title).toEqual('Pauls Boutique');
    expect(result.artist).toEqual('Beastie Boy');
    expect(result.played).toBe(false);
  });

  test('addAlbum prints information about the album that was added', () => {
    console.log = jest.fn();
    music.addAlbum('License to Ill', 'Beastie Boys');
    expect(console.log.mock.calls[0][0]).toEqual('Added "License to Ill" by Beastie Boys');
  });

  test('addAlbum does not allow you add an album already in the collection', () => {
    const result = loadedMusic.addAlbum('Thursdays Child', 'Eartha Kitt');
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toEqual('That album title already exists in the collection');
  });

  test('addAlbum does not allow you add an album with the same title but a different artist than an album already in the collection', () => {
    const result = loadedMusic.addAlbum('Thursdays Child', 'David Bowie');
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toEqual('That album title already exists in the collection');
  });

  test('showAll returns all albums in the musicCollection', () => {
    expect(loadedMusic.showAll()).toEqual(loadedAlbums);
  });

  test('showAll prints information about the albums in the collection', () => {
    console.log = jest.fn();
    loadedMusic.showAll();
    expect(console.log.mock.calls[0][0]).toEqual('Down to Eartha by Eartha Kitt (played)');
    expect(console.log.mock.calls[1][0]).toEqual('That Bad Eartha by Eartha Kitt (played)');
    expect(console.log.mock.calls[2][0]).toEqual('Thursdays Child by Eartha Kitt (unplayed)');
    expect(console.log.mock.calls[3][0]).toEqual('Aja by Steely Dan (played)');
  });

  test('play returns the album that is played', () => {
    const result = loadedMusic.play('Thursdays Child');
    expect(result).toBeInstanceOf(Album);
    expect(result.title).toEqual('Thursdays Child');
    expect(result.artist).toEqual('Eartha Kitt');
  });

  test('play logs info about the album that is playing', () => {
    console.log = jest.fn();
    loadedMusic.play('Thursdays Child');
    expect(console.log.mock.calls[0][0]).toEqual('You\'re listening to "Thursdays Child"');
  });

  test('play handles errors when someone attempts to play an album that does not exist', () => {
    const result = loadedMusic.play('Letter to the Five Boroughs');
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toEqual('That album does not exist in the collection');
  });

  test('play sets the status of the album to have been played', () => {
    expect(thursdaysChild.played).toEqual(false);
    loadedMusic.play('Thursdays Child');
    expect(thursdaysChild.played).toEqual(true);
  });

  test('showUnplayed returns all albums that have not been played', () => {
    const result = loadedMusic.showUnplayed();
    expect(result).toEqual([thursdaysChild]);
  });

  test('showUnplayed displays info about all albums that have not been played', () => {
    console.log = jest.fn();
    loadedMusic.showUnplayed();
    expect(console.log.mock.calls[0][0]).toEqual('Thursdays Child by Eartha Kitt');
  });

  test('showUnplayed throws an error when there are no unplayed albums', () => {
    const result = music.showUnplayed();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toEqual('There are no unplayed albums in the collection.');
  });

  test('showAllByArtist returns all albums by a specific artist', () => {
    const result = loadedMusic.showAllByArtist('Eartha Kitt');
    expect(result).toEqual([downToEartha, thatBadEartha, thursdaysChild]);
  });

  test('showAllByArtist checks for when the artist is not in the collection', () => {
    const result = loadedMusic.showAllByArtist('Ad-Rock');
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toEqual('There are no albums by Ad-Rock in the collection.');
  });

  test('showAllByArtist displays info about all albums by a specific artist', () => {
    console.log = jest.fn();
    loadedMusic.showAllByArtist('Eartha Kitt');
    expect(console.log.mock.calls[0][0]).toEqual('Down to Eartha by Eartha Kitt (played)');
  });

  test('showUnplayedByArtist returns all unplayed albums by a specific artist', () => {
    const result = loadedMusic.showUnplayedByArtist('Eartha Kitt');
    expect(result).toEqual([thursdaysChild]);
  });

  test('showUnplayedByArtist checks for when the artist has no unplayed albums in the collection', () => {
    const result = loadedMusic.showUnplayedByArtist('Steely Dan');
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toEqual('There are no unplayed albums by Steely Dan in the collection.');
  });

  test('showUnplayedByArtist displays info about unplayed albums by a specific artist', () => {
    console.log = jest.fn();
    loadedMusic.showUnplayedByArtist('Eartha Kitt');
    expect(console.log.mock.calls[0][0]).toEqual('Thursdays Child by Eartha Kitt');
  });

  test('processFirstArg', () => {
    const result = music.processFirstArg('add "Ride the Lightning" "Metallica"');
    expect(result).toEqual('Ride the Lightning');
  });

  test('processSecondArg', () => {
    const result = music.processSecondArg('add "Ride the Lightning" "Metallica"');
    expect(result).toEqual('Metallica');
  });
});

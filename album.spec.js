const Album = require('./album');

describe('Album', () => {
  let album;
  beforeEach(() => {
    album = new Album();
  });

  test('it initializes with the album as unplayed', () => {
    expect(album.played).toBe(false);
  });

  test('showPlayedStatus returns the correct played status', () => {
    expect(album.showPlayedStatus()).toEqual('(unplayed)');
  });
});

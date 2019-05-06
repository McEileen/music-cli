const readline = require('readline');

const MusicCollection = require('./musicCollection');

module.exports = () => {
  console.log('Welcome to your music collection!');

  const music = new MusicCollection();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (input) => {
    const command = input.match(/[^"']*/i)[0].trim();
    switch (command) {
      case '': {
        console.log('We did not receive anything. Please try again.');
        break;
      }
      case 'add': {
        if (!input.match(/"(.*?)"/g) || input.match(/"(.*?)"/g).length < 2) {
          console.log('Sorry, your input was incomplete.  Please try again.');
          break;
        }
        const title = music.processFirstArg(input);
        const artist = music.processSecondArg(input);
        music.addAlbum(title, artist);
        break;
      }
      case 'show all': {
        music.showAll();
        break;
      }
      case 'play': {
        const title = music.processFirstArg(input);
        music.play(title);
        break;
      }
      case 'show unplayed': {
        music.showUnplayed();
        break;
      }
      case 'show all by': {
        const artist = music.processFirstArg(input);
        music.showAllByArtist(artist);
        break;
      }
      case 'show unplayed by': {
        const artist = music.processFirstArg(input);
        music.showUnplayedByArtist(artist);
        break;
      }
      case 'quit': {
        console.log('Bye!');
        rl.close();
        break;
      }
      default: {
        console.log('Sorry, your input was not recognized. Please try again.');
        break;
      }
    }
  });
};

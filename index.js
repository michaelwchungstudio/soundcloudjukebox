// Establishing variables linking to HTML elements
var playbutton = document.getElementById('playbutton');
var pausebutton = document.getElementById('pausebutton');
var nextbutton = document.getElementById('nextbutton');

var albumart = document.getElementById('albumart');
var songName = document.getElementById('songname');
var artistName = document.getElementById('artistname');
var albumName = document.getElementById('albumname');

// Song class with five parameters - title, artist, album, album art url, song url
class Song {
  constructor(songtitle, artist, album, albumart, url) {
    this.songtitle = songtitle;
    this.artist = artist;
    this.album = album;
    this.albumart = albumart;
    this.url = url;
  }
}

// Creating a pre-made list of Song objects
var s1 = new Song("Amenamy", "Purity Ring", "Shrines", "img/shrines.jpg", "audio/Amenamy.mp3");
var s2 = new Song("Belispeak", "Purity Ring", "Shrines", "img/shrines.jpg", "audio/Belispeak.mp3");
var s3 = new Song("Cartographist", "Purity Ring", "Shrines", "img/shrines.jpg", "audio/Cartographist.mp3");
var s4 = new Song("Crawlersout", "Purity Ring", "Shrines", "img/shrines.jpg", "audio/Crawlersout.mp3");
var s5 = new Song("Father Stretch My Hands Pt. 1 feat. Kid Cudi", "Kanye West", "The Life of Pablo", "img/tlop.jpg", "audio/FatherStretchMyHandsPt1.mp3");
var s6 = new Song("Fineshrine", "Purity Ring", "Shrines", "img/shrines.jpg", "audio/Fineshrine.mp3");
var s7 = new Song("FML feat. The Weeknd", "Kanye West", "The Life of Pablo", "img/tlop.jpg", "audio/fml.mp3");
var s8 = new Song("I Love Kanye", "Kanye West", "The Life of Pablo", "img/tlop.jpg", "audio/ilovekanye.mp3");
var s9 = new Song("Lofticries", "Purity Ring", "Shrines", "img/shrines.jpg", "audio/Lofticries.mp3");
var s10 = new Song("Obedear", "Purity Ring", "Shrines", "img/shrines.jpg", "audio/Obedear.mp3");
var s11 = new Song("Saltkin", "Purity Ring", "Shrines", "img/shrines.jpg", "audio/Saltkin.mp3");
var s12 = new Song("Shuck", "Purity Ring", "Shrines", "img/shrines.jpg", "audio/Shuck.mp3");
var s13 = new Song("30 Hours feat. Andre 3000", "Kanye West", "The Life of Pablo", "img/tlop.jpg", "audio/thirtyhours.mp3");
var s14 = new Song("Ultralight Beam feat. Chance the Rapper & Kirk Franklin", "Kanye West", "The Life of Pablo", "img/tlop.jpg", "audio/UltraLightBeam.mp3");
var s15 = new Song("Ungirthed", "Purity Ring", "Shrines", "img/shrines.jpg", "audio/Ungirthed.mp3");
var s16 = new Song("Famous feat. Rihanna", "Kanye West", "The Life of Pablo", "img/tlop.jpg", "audio/famous.mp3");

// Jukebox class that consists of an array of the previously made Song objects
class Jukebox {
  constructor() {
    this.songArchive = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16];
    this.trackNum = 0;
    this.currentSong = new Audio(this.songArchive[this.trackNum].url);
    // this.currentSongName = this.songArchive[this.trackNum].songtitle;
    // this.currentArtist = this.songArchive[this.trackNum].artist;
    // this.currentAlbum = this.songArchive[this.trackNum].album;
    // this.currentAlbumArtLoc = this.songArchive[this.trackNum].albumart;
  }

  // Plays the current trackNum song
  playCurrent() {
    this.currentSong.play();
    albumart.style.backgroundImage = "url(" + this.songArchive[this.trackNum].albumart + ")";
    songName.innerText = this.songArchive[this.trackNum].songtitle;
    artistName.innerText = this.songArchive[this.trackNum].artist;
    albumName.innerText = this.songArchive[this.trackNum].album;
  }

  // Pause the current trackNum song
  pauseCurrent() {
    this.currentSong.pause();
  }

  // Pauses the current trackNum song, sets the time to zero, plays trackNum+1
  nextSong() {
    this.currentSong.pause();
    this.currentSong.currentTime = 0;
    this.trackNum++;

    if(this.trackNum > this.songArchive.length - 1) {
      this.trackNum = 0;
      this.currentSong = new Audio(this.songArchive[this.trackNum].url);
      this.currentSong.play()
      albumart.style.backgroundImage = "url(" + this.songArchive[this.trackNum].albumart + ")";
      songName.innerText = this.songArchive[this.trackNum].songtitle;
      artistName.innerText = this.songArchive[this.trackNum].artist;
      albumName.innerText = this.songArchive[this.trackNum].album;
    }
    else {
      this.currentSong = new Audio(this.songArchive[this.trackNum].url);
      this.currentSong.play();
      albumart.style.backgroundImage = "url(" + this.songArchive[this.trackNum].albumart + ")";
      songName.innerText = this.songArchive[this.trackNum].songtitle;
      artistName.innerText = this.songArchive[this.trackNum].artist;
      albumName.innerText = this.songArchive[this.trackNum].album;
    }
  }
}

var virtJukebox = new Jukebox();

playbutton.addEventListener('click', function() {
  virtJukebox.playCurrent();
});

pausebutton.addEventListener('click', function() {
  virtJukebox.pauseCurrent();
});

nextbutton.addEventListener('click', function() {
  virtJukebox.nextSong();
})

// API initialization using client_id
SC.initialize({
    client_id: 'f665fc458615b821cdf1a26b6d1657f6'
});

// Establishing variables linking to HTML elements
var stopbutton = document.getElementById('circleL');
var playbutton = document.getElementById('circleC');
var pausebutton = document.getElementById('circleR');
var nextbutton = document.getElementById('nextbutton');
var backbutton = document.getElementById('backbutton');

var albumart = document.getElementById('albumart');
var songName = document.getElementById('songname');
var artistName = document.getElementById('artistname');
var scloudHeart = document.getElementById('scloudheart');
var likesCount = document.getElementById('likescount');

var progressbar = document.getElementById('progressbar');

var player;

// Jukebox class that holds an array of objects of information from the Soundcloud API
class Jukebox {
  constructor() {
    this.infoArchive = [];
    this.songArchive = [];
    this.trackNum = 0;
  }

  // Plays the current trackNum song
  playCurrent() {
    this.songArchive[this.trackNum].play();

    albumart.style.backgroundImage = "url(" + this.infoArchive[this.trackNum].artwork_url + ")";
    songName.innerText = this.infoArchive[this.trackNum].title;
    artistName.innerText = this.infoArchive[this.trackNum].user.username;
    scloudHeart.style.opacity = "1";
    likesCount.innerText = this.infoArchive[this.trackNum].likes_count;

    var that = this;

    that.songArchive[that.trackNum].on('time', function() {
      progressbar.value = (that.songArchive[that.trackNum].currentTime() / that.songArchive[that.trackNum].getDuration());
    })

    that.songArchive[that.trackNum].on('finish', function() {
      that.nextSong();
    });
  }

  previousSong() {
    this.stopSong();
    this.trackNum--;

    if(this.trackNum < 0) {
      this.trackNum = this.songArchive.length - 1;
      this.playCurrent();
    }
    else {
      this.playCurrent();
    }
  }

  nextSong() {
    this.stopSong();
    this.trackNum++;

    if(this.trackNum > this.songArchive.length - 1) {
      this.trackNum = 0;
      this.playCurrent();
    }
    else {
      this.playCurrent();
    }
  }

  stopSong() {
    this.songArchive[this.trackNum].pause();
    this.songArchive[this.trackNum].seek(0);
  }

  pauseSong() {
    this.songArchive[this.trackNum].pause();
  }
}

// Jukebox object created!
var virtJukebox = new Jukebox();
var sequence = Promise.resolve();

// STUDY THIS - PROMISES
SC.get("/tracks/",{
	q: 'taquwami'
}).then(function(response){
  var songInfo = response;

  for(let i = 0; i < songInfo.length; i++) {
    virtJukebox.infoArchive.push(songInfo[i]);

    sequence = sequence.then(function() {
      return SC.stream("/tracks/" + songInfo[i].id).then(function(stream){
        virtJukebox.songArchive.push(stream);
        console.log(songInfo[i]);
      })
    })
  };
});

console.log(virtJukebox.infoArchive);

// Event listeners for the buttons to trigger the functions of the Jukebox object
playbutton.addEventListener('click', function() {
  virtJukebox.playCurrent();
});

backbutton.addEventListener('click', function() {
  virtJukebox.previousSong();
});

nextbutton.addEventListener('click', function() {
  virtJukebox.nextSong();
});

pausebutton.addEventListener('click', function() {
  virtJukebox.pauseSong();
});

stopbutton.addEventListener('click', function() {
  virtJukebox.stopSong();
});

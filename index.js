// API initialization using client_id
SC.initialize({
    client_id: id
});

// Establishing variables linking to HTML elements
var artistInput = document.getElementById('artistInput');
var searchButton = document.getElementById('searchIcon');
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
    morphInfoArtwork(this);
    var that = this;

    that.songArchive[that.trackNum].on('time', function() {
      progressbar.value = (that.songArchive[that.trackNum].currentTime() / that.songArchive[that.trackNum].getDuration());
    })

    that.songArchive[that.trackNum].on('finish', function() {
      that.nextSong();
    });
  }

  // stops the current song, changes the track number (--), plays that track using playCurrent() function
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

  // stops the current song, changes the track number (++), plays that track using playCurrent() function
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

  // pauses the current song and sets the current time to zero
  stopSong() {
    this.songArchive[this.trackNum].pause();
    this.songArchive[this.trackNum].seek(0);
  }

  // pauses the current song (pressing play after will resume!)
  pauseSong() {
    this.songArchive[this.trackNum].pause();
  }
}

// changes the artwork and song information
function morphInfoArtwork(jukebox) {
  tempURL = jukebox.infoArchive[jukebox.trackNum].artwork_url;
  tempURL = tempURL.replace('-large', '-t500x500');

  albumart.style.backgroundImage = "url(" + tempURL + ")";
  songName.innerText = jukebox.infoArchive[jukebox.trackNum].title;
  artistName.innerText = jukebox.infoArchive[jukebox.trackNum].user.username;
  scloudHeart.style.opacity = "1";
  likesCount.innerText = jukebox.infoArchive[jukebox.trackNum].likes_count.toLocaleString();
}

// clears the artwork and song information
function clearInfoArtwork(jukebox) {
  albumart.style.backgroundImage = "";
  songName.innerText = "";
  artistName.innerText = "";
  scloudHeart.style.opacity = "0";
  likesCount.innerText = "";
}

// Dynamically create the track listings based on search input
// Each has a 'click' event listener to play that specific track
function createSearchListing(jukebox, num) {
  let tempTrackListing = document.createElement('div');
  tempTrackListing.className = 'trackListing';

  let tempTrackSong = document.createElement('div');
  tempTrackSong.className = 'trackSong';
  tempTrackSong.innerHTML = jukebox.infoArchive[num].title;

  let tempTrackArtist = document.createElement('div');
  tempTrackArtist.className = 'trackArtist';
  tempTrackArtist.innerHTML = jukebox.infoArchive[num].user.username;

  tempTrackListing.append(tempTrackSong);
  tempTrackListing.append(tempTrackArtist);

  tempTrackListing.addEventListener('click', function() {
    jukebox.stopSong();
    jukebox.trackNum = num;
    jukebox.playCurrent();
  })

  // tempTrackListing.addEventListener('hover', function() {
  //   tempTrackSong.style.color = "#F26422";
  // })

  $("#searchListingArea").append(tempTrackListing);
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

        createSearchListing(virtJukebox, i);
      })
    })
  };
});

console.log(virtJukebox.infoArchive);

// Event listener for search
searchButton.addEventListener('click', function() {
  // Stop currently playing song, clear artwork and search listing area
  virtJukebox.stopSong();
  clearInfoArtwork();
  $("#searchListingArea").html("");
  // Clear songs and information
  virtJukebox.trackNum = 0;
  virtJukebox.infoArchive = [];
  virtJukebox.songArchive = [];

  virtJukebox = new Jukebox();

  SC.get("/tracks/",{
  	q: artistInput.value
  }).then(function(response){
    var songInfo = response;

    for(let i = 0; i < songInfo.length; i++) {
      virtJukebox.infoArchive.push(songInfo[i]);

      sequence = sequence.then(function() {
        return SC.stream("/tracks/" + songInfo[i].id).then(function(stream){
          virtJukebox.songArchive.push(stream);
          console.log(songInfo[i]);

          createSearchListing(virtJukebox, i);
          // once the first song is loaded, play it!
          // if(i == 0) {
          //   virtJukebox.playCurrent();
          // }
        })
      })
    }

    // sequence.then(function() {
    //   console.log("lol");
    //   virtJukebox.playCurrent();
    // });
  });

  console.log(JSON.stringify(virtJukebox));
  console.log(virtJukebox)
});

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

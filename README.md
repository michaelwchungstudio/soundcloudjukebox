# 'Cloud Box

Virtual jukebox with audiovisualizer implementing the SoundCloud API.

![Site Example](/siteimg/siteexample.png)

## How To Use

On load, 'Cloud Box has a preset track list based on searching for the artist 'Taquwami'. The user can search for an artist or song, generating a list of results based off SoundCloud's SC.get function. From here, the user has multiple options. Upon search, the first track result will be loaded into the virtual jukebox, and can be played by selecting the play button. Any individual result may also be selected in order to play that specific song. Songs can also be cycled through using the left and right arrow buttons. When a song is playing, the vinyl representation should spin and the audiovisualizer below will reflect that song's dynamic audio frequency levels. The jukebox has both a pause and stop button. Stopping a song will essentially pause the song and set the track's current time to zero, thus starting from the beginning again upon play.

All track information - artist, song, likes - is drawn from the SoundCloud API.

## Built With

* HTML
* CSS
* JavaScript
* SoundCloud API

## Authors

* **Michael Chung**

## Acknowledgments

* SoundCloud
* Oggi Danailov
* New York Code & Design Academy
* StackOverflow

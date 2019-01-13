![Site Example](/siteimg/siteexample.png)

# 'Cloud Box

Virtual jukebox with audiovisualizer implementing the SoundCloud API.

## How To Use

On load, 'Cloud Box has a preset track list based on searching for the artist 'Taquwami'. The user can search for an artist or song, generating a list of results based off SoundCloud's SC.get function. From here, the user has multiple options. Upon search, the first track result will be loaded into the virtual jukebox, and can be played by selecting the play button. Any individual result may also be selected in order to play that specific song. Songs can also be cycled through using the left and right arrow buttons. When a song is playing, the vinyl representation should spin and the audiovisualizer below will reflect that song's dynamic audio frequency levels. The jukebox has both a pause and stop button. Stopping a song will essentially pause the song and set the track's current time to zero, thus starting from the beginning again upon play.

All track information - artist, song, likes - is drawn from the SoundCloud API.

Playing and cycling through songs:

![Site In Action 1](/siteimg/scloudprev1.gif)

Searching and playing a song:

![Site In Action 2](/siteimg/scloudprev2.gif)

## Future Improvements / Bug Fixes

SoundCloud does not currently accept [new registrations](http://soundcloud.com/you/apps/new) for applications implementing their API. This project uses an API key provided by my instructor. It is generally considered bad practice to include this API key in front end code. Typically, such information would be kept in a file that a web server might access. In this case, my file containing the API key is included in .gitignore and is not shown. This renders the GitHub Page for this project useless as there is no connection to SoundCloud's API.

Potential future functions to add:
 - pasting a direct SoundCloud link in the input area will play that specific song (needed: a check to see if the input is a link in order to ignore SC.get)
 - additional audiovisualization options (radial, various geometric shapes, wider variety of color changes)
 - slider for volume
 - slider for scrubbing through the song
 - add back end using possibly Python or Ruby on Rails in order to allow users to sign up and create playlists by adding searched songs

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

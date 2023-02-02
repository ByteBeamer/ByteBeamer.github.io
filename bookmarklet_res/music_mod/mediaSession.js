var video = document.getElementsByClassName("video-stream html5-main-video")[0];
if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: document.getElementsByTagName("h1")[0].innerHTML,
            artist: 'Youtube',
            album: '',
        });

        navigator.mediaSession.setActionHandler('play', function() {
            video.play();
        });
        navigator.mediaSession.setActionHandler('pause', function() {
            video.pause();
        });
        navigator.mediaSession.setActionHandler('stop', function() {
            video.pause();
        });
        navigator.mediaSession.setActionHandler('seekbackward', function() {
            video.currentTime = video.currentTime - 15;
        });
        navigator.mediaSession.setActionHandler('seekforward', function() {
            video.currentTime = video.currentTime + 15;
        });
        navigator.mediaSession.setActionHandler('seekto', function() {});
        navigator.mediaSession.setActionHandler('previoustrack', function() {
            video.currentTime = 0;
        });
        navigator.mediaSession.setActionHandler('nexttrack', function() {
            video.currentTime = video.duration;
        });
        navigator.mediaSession.setActionHandler('skipad', function() {
            /* Code excerpted. */
        });
    }

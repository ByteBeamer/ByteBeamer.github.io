//lol make an error
var video = document.getElementsByClassName("video-stream html5-main-video")[0];
var videoBar = document.getElementsByClassName("ytd-menu-renderer")[0];
var playlist = document.querySelectorAll("[id='top-level-buttons-computed']")[1];
var notification; /*= document.querySelectorAll("tp-yt-paper-toast")[1].querySelectorAll("yt-formatted-string")[0].innerHTML;*/
var subscribe = document.getElementsByClassName("ytd-subscribe-button-renderer")[0];
var next = document.querySelectorAll("[id='video-title']");
var videoIndex = document.querySelectorAll("[id='publisher-container']")[1].children[2].getElementsByClassName("index-message")[0].innerHTML.split(" / ");
var startVolume = video.volume;
var playBackSpeed = video.playbackRate;
var play = document.getElementsByClassName('ytp-play-button')[0];
var confirmDialog;
var videoDur = video.duration;
var loopVideo = video.loop;
var thumbnailImg = `https://img.youtube.com/vi/${extractVideoID(window.location.href)}/0.jpg`;
var caption;
var showThumbnail = true;
var url = window.location.href;
var uploader = document.querySelectorAll("[id='top-row']")[1].querySelectorAll("[id='upload-info']")[0].querySelectorAll("a")[0].innerHTML;
var version = "3.5";
var settingsData;

//VOLUME
if (!(window.audioContext || window.webkitAudioContext)) {
  var audioContext = new AudioContext();
  var track = audioContext.createMediaElementSource(video);
  track.connect(audioContext.destination);
  var gainNode = audioContext.createGain();
  const pannerOptions = { pan: 0 };
  const panner = new StereoPannerNode(audioContext, pannerOptions);
  var filter = audioContext.createBiquadFilter();
  filter.type = 'allpass';
  track.connect(gainNode).connect(panner).connect(filter).connect(audioContext.destination);
} else {
  var audioContext = window.audioContext || window.webkitAudioContext;
  var track = audioContext.createMediaElementSource(video);
  track.connect(audioContext.destination);
  var gainNode = audioContext.gainNode;
  const pannerOptions = { pan: 0 };
  const panner = audioContext.steroPannerNode;
  track.connect(gainNode).connect(panner).connect(audioContext.destination);
}
//record
var stream = video.captureStream(25);
var recordedChunks = [];

var options = {
    mimeType: "video/webm; codecs=vp9"
};

var mediaRecorder = new MediaRecorder(stream, options);

mediaRecorder.ondataavailable = handleDataAvailable;

//create
var win = window.open("", "popUpWindow", "height=800,width=250,left=1200");

win.document.write(`
<head>
  <title>Not Playing</title>
</head>
<body>
  <style>
    .myslider {
      -webkit-appearance: none;
      background: #ff3700;
      width: 98%;
      height: 14px;
      opacity: 2;
      border-radius: 20px;
      --slider-color: #ff5f33;
      --slider-color-active: #ff7f5c;
    }

    .myslider::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 20px;
      width: 20px;
      background: var(--slider-color);
      border-radius: 30px;
    }

    .myslider:active::-webkit-slider-thumb {
      background-color: var(--slider-color-active);
      width: 22px;
      height: 22px;
    }

    button {
      border-radius: 10px;
      background-color: #f44336;
      /* Green */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
    }

    .center {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 70px;
    }

    input[type=checkbox] {
      height: 0;
      width: 0;
      visibility: hidden;
    }

    label {
      cursor: pointer;
      text-indent: 110%;
      line-height: 25px;
      width: 45px;
      height: 25px;
      background-color: grey;
      display: block;
      border-radius: 100px;
      position: relative;
      margin-right: 60px;
      --thumb-color: white;
    }

    label:after {
      content: '';
      position: absolute;
      top: 1px;
      left: 1px;
      width: 23px;
      height: 23px;
      background: var(--thumb-color);
      border-radius: 90px;
      transition: 0.3s;
    }

    input:checked+label {
      background: dodgerblue;
    }

    input:checked+label:after {
      left: calc(100% - 1px);
      transform: translateX(-100%);
    }

    label:active:after {
      width: 23px;
    }
    
    select {
      width: 100%;
      overflow: hidden;
      white-space: pre;
      text-overflow: ellipsis;
      -webkit-appearance: none;
    }
  </style>
  <h3 class="center" id="nowPlaying" style="height:30px; padding-bottom: 2px; margin-top: 16px;"></h3>
  <p class="center" id="uploader" style="height:20px; padding-bottom:30px"></p>
    <div class="center">
      <img style="width:80vw; max-width:300px; max-height: 350px; margin-bottom: 10px; margin-top:25px;" id="thumbnail" alt="thumbnail">
    </div>
    <h3 style="padding-top:35px;height:30px;" class="center" id="upNext"></h3>
    <div class="center">
      <span id="captions"></span>
    </div>
    <input type="range" min="0" max=${video.duration} value=${video.currentTime} class="myslider" id="sliderRange">
    <br>
    <div class="center">
      <button id="play">Play/Pause</button>
      <br>
    </div>
    <div class="center">
      <button id="forward">Forward</button>
      <button id="rewind">Rewind</button>
      <br>
    </div>
    <div class="center">
      <button id="restart">Restart</button>
      <button id="end">End</button>
    </div>
    <div class="center">
      <button id="mute">Mute/Unmute</button>
    </div>
    <div class="center">
      <button id="loop">Loop</button>
      <button id="shuffle">Shuffle</button>
    </div>
    <div class="center">
      <button id="like">Like</button>
      <button id="dislike">Dislike</button>
    </div>
    <div class="center">
      <button id="sub">Subscribe</button>
    </div>
    <div class="center">
      <button id="share">Share</button>
    </div>
    <div class="center">
      <button id="miniplayer">Miniplayer</button>
    </div>
    <div class="center">
      <p id="volumeVal">Volume</p>
      <input type="range" min="0.1" max="1.0" step="0.05" value=${startVolume} id="vol" class="myslider">
    </div>
    <div class="center">
      <p id="bassBoostVal">Bass Boost</p>
      <input type="range" min="0.1" max="3.0" step="0.1" value=${startVolume} id="bassBoost" class="myslider">
    </div>
    <div class="center">
      <p id="pannerVal">Panner</p>
      <input type="range" min="-1" max="1.0" step="0.01" value="0" id="pan" class="myslider">
    </div>
    <div class="center">
      <p id="playBackVal">Playback Speed : ${playBackSpeed}</p>
      <input type="range" min="0.1" max="5.0" step="0.05" value=${playBackSpeed} id="speed" class="myslider">
    </div>
    <div class="center">
      <p>Audio Settings</p>
      <select name="audioFilter" id="audioFilter">
        <option selected>allpass</option>
        <option>notch</option>
        <option>peaking</option>
        <option>highshelf</option>
        <option>lowshelf</option>
        <option>bandpass</option>
        <option>highpass</option>
        <option>lowpass</option>
      </select>
    </div>
    <div style="position:fixed;left:4%;top:90%; z-index: 999;" id="notif"></div>
    <div class="center">
      <input type="checkbox" id="darkmode">
      <label for="darkmode">Dark mode</label>
      <input type="checkbox" id="adblock" name="adblock">
      <label for="adblock">Adblock</label>
    </div>
    <div class="center">
      <input type="checkbox" id="loopvideo" name="loopvideo">
      <label for="loopvideo">Loop video</label>
      <input type="checkbox" id="recording" name="recording">
      <label for="recording">Record Beta</label>
    </div>
    <div class="center">
      <input type="checkbox" id="thumbnailToggle" name="thumbnailToggle" checked>
      <label for="thumbnailToggle">Thumbnail</label>
    </div>
    <div class="center">
      <select name="videos" id="videos"></select>
    </div>
    <div class="center">
      <p>Import Settings</p>
      <input type="file" id="import-settings" style="user-select: none; cursor:pointer; background-color: #0076d1; border-radius: 10px; width: 240px;" accept=".txt"></input>
    </div>
    <div class="center">
      <h2 id="export-settings" style="user-select: none; cursor:pointer; background-color: #0076d1; border-radius: 10px; width: 240px;">Export Settings</h2>
    </div>
    <div class="center">
      <h2 id="changelog-max" style="user-select: none; cursor:pointer; background-color: #0076d1; border-radius: 10px; width: 240px;">Show Change log</h2>
    </div>
    <div id="changelog" style="display:none;">
    </div>
</body>
`);

var allSliders = win.document.querySelectorAll('input');

win.document.addEventListener('keydown', function(event) {
    if (event.keyCode == 37) {
        for (var i = 0; i < allSliders.length; i++) {
            var isFocused = (win.document.activeElement === allSliders[i]);
            if (isFocused) {
                return;
            }
        }
        video.currentTime = video.currentTime - 15;
    } else if (event.keyCode == 39) {
        for (var i = 0; i < allSliders.length; i++) {
            var isFocused = (win.document.activeElement === allSliders[i]);
            if (isFocused) {
                return;
            }
        }
        video.currentTime = video.currentTime + 15;
    } else if (event.keyCode == 32) {
        event.preventDefault();
        play.click();
    }
});

var changelog = win.document.getElementById("changelog");
var changelogOpener = win.document.getElementById("changelog-max");
var changelogToggle = false;
changelogOpener.onclick = function() {
    changelogToggle = !changelogToggle;
    if (changelogToggle) {
        changelog.style.display = "inline";
        changelogOpener.innerText = "Hide Change Log";
    } else {
        changelog.style.display = "none";
        changelogOpener.innerText = "Show Change Log";
    }
}

function setChangelog(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.text();
        })
        .then(text => changelog.innerHTML = text)
        .catch(error => changelog.innerHTML = `Could not fetch changelog: ${error}`);
}

function checkforUpdates(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.text();
        })
        .then(function(text) {
            if (parseFloat(text) <= parseFloat(version)) {

            } else {
                win.alert("New Update available");
            }
        })
        .catch(error => alert("Couldn't check for updates: " + error));
}

setChangelog("https://bytebeamer.github.io/bookmarklet_res/media-options-changelog.txt");
checkforUpdates("https://bytebeamer.github.io/bookmarklet_res/media-options-version.txt");

var slider = win.document.getElementById('sliderRange');
var vol = win.document.getElementById('vol');
var speed = win.document.getElementById('speed');
var bassBoost = win.document.getElementById('bassBoost');
var pannerControl = win.document.getElementById('pan');
var audioFilter = win.document.getElementById("audioFilter");

audioFilter.onchange = function () {
  filter.type = audioFilter.options[audioFilter.selectedIndex].text;
};

pannerControl.onchange = function() {
    panner.pan.value = this.value;
};

speed.onchange = function() {
    video.playbackRate = speed.value;
};

vol.onchange = function() {
    video.volume = vol.value;
};

bassBoost.onchange = function() {
    gainNode.gain.value = bassBoost.value;
};

slider.onchange = function() {
    video.currentTime = slider.value;
};

var play_btn = win.document.getElementById('play');
var restart_btn = win.document.getElementById('restart');
var end_btn = win.document.getElementById('end');
var mute_btn = win.document.getElementById('mute');
var sync_btn = win.document.getElementById('sync');
var rewind = win.document.getElementById('rewind');
var forward = win.document.getElementById('forward');
var loopToggle = win.document.getElementById('loopToggle');
var loop = win.document.getElementById('loop');
var shuffle = win.document.getElementById('shuffle');
var like = win.document.getElementById('like');
var dislike = win.document.getElementById('dislike');
var sub = win.document.getElementById('sub');
var darkMode = win.document.getElementById("darkmode");
var adblock = win.document.getElementById("adblock");
var videoSelect = win.document.getElementById("videos");
var videoLoop = win.document.getElementById("loopvideo");
var share = win.document.getElementById("share");
var recording = win.document.getElementById("recording");
var miniplayer = win.document.getElementById("miniplayer");
var thumbnailToggle = win.document.getElementById("thumbnailToggle");
var importSettings = win.document.getElementById("import-settings");
var exportSettings = win.document.getElementById("export-settings");

importSettings.onchange = function () {
  var settingsFile = importSettings.files[0];
  var output;
  const fileReader = new FileReader();
  fileReader.addEventListener("load", () => {
    output = fileReader.result;
    var settingsArray = output.split("\n");
    speed.value = Number(settingsArray[0]);
    speed.dispatchEvent(new Event('change'));
    vol.value = Number(settingsArray[1]);
    vol.dispatchEvent(new Event('change'));
    bassBoost.value = Number(settingsArray[2]);
    bassBoost.dispatchEvent(new Event('change'));
    pannerControl.value = Number(settingsArray[3]);
    pannerControl.dispatchEvent(new Event('change'));
    for (var i = 0; i < audioFilter.options.length; ++i) {
        if (audioFilter.options[i].text == settingsArray[4])
            audioFilter.options[i].selected = true;
    }
    audioFilter.dispatchEvent(new Event('change'));
    //win.alert(output);
  });
  fileReader.readAsText(settingsFile);
};

exportSettings.onclick = function () {
  downloadFile(settingsData, document.getElementsByTagName("h1")[1].innerText, "txt");
};

thumbnailToggle.onchange = function () {
   if (thumbnailToggle.checked) {
      showThumbnail = true;
   } else {
      showThumbnail = false;
   }
};

miniplayer.onclick = function () {
  if (document.pictureInPictureElement) {
  document.exitPictureInPicture()
    .then(() => console.log("Document Exited from Picture-in-Picture mode"))
    .catch((err) => win.alert(err));
  } else {
    enterPictureInPicture(500);
  }
};

function enterPictureInPicture(ms) {
  setTimeout(() => {
    video.requestPictureInPicture()
      .then(() => {
      })
      .catch(err => win.alert(err));
  }, ms);
}

recording.onchange = function() {
    if (recording.checked) {
        var text = 'Started Recording';
        mediaRecorder.start();
        var notification = new Notification('Media Options', {
            body: text,
            icon: thumbnailImg
        });
    } else {
        var text = 'Processing your video';
        mediaRecorder.stop();
        var notification = new Notification('Media Options', {
            body: text,
            icon: thumbnailImg
        });
    }
};

share.onclick = function() {
    videoBar.children[2].click();
    //two instances of tp-yt-paper-dialog
    document.getElementsByClassName("yt-third-party-share-target-section-renderer")[0].querySelectorAll("button")[1].click();
    for (var i = 0; i < document.getElementsByClassName("yt-third-party-share-target-section-renderer")[0].querySelectorAll("button").length; i++) {
        if (document.getElementsByClassName("yt-third-party-share-target-section-renderer")[0].querySelectorAll("button")[i].innerText == "Email") {
            document.getElementsByClassName("yt-third-party-share-target-section-renderer")[0].querySelectorAll("button")[i].click();
        }
    }
    //document.getElementsByClassName("yt-third-party-share-target-section-renderer")[0].getElementsByClassName("yt-share-panel-head-renderer")[1].children[0].click();
};

videoLoop.onchange = function() {
    if (videoLoop.checked) {
        video.loop = true;
    } else {
        video.loop = false;
    }
};

videoSelect.onchange = function() {
    var selected = videoSelect.options[videoSelect.selectedIndex].text;
    for (var i = 0; i < parseInt(document.querySelectorAll("[id='publisher-container']")[1].children[2].getElementsByClassName("index-message")[0].innerHTML.split(" / ")[1]); i++) {
        if ((next[i].innerHTML.replace(/\s+/g, ' ').trim()) == (selected.replace(/\s+/g, ' ').trim())) {
            next[i].click();
        }
    }
};

adblock.onchange = function() {
    if (adblock.checked) {
        skipAds = setInterval(() => {
            clickSkipButton();
            closeBannerAd();
            muteIfAdRunning();
        }, 500);
        setCookie("adblock", true, 31);
    } else {
        clearInterval(skipAds);
        setCookie("adblock", false, 31);
    }
};

darkMode.onchange = function() {
    if (darkMode.checked) {
        mode("dark");
        setCookie("darkmode", true, 30);
    } else {
        mode("light");
        setCookie("darkmode", false, 30);
    }
};

sub.onclick = function() {
    subscribe.click();
};

loop.onclick = function() {
    playlist.children[0].click();
    win.document.getElementById("notif").innerHTML = notif.innerHTML;
    setTimeout(function() {
        win.document.getElementById("notif").innerHTML = "";
    }, 3000);
};

shuffle.onclick = function() {
    playlist.children[1].click();
    win.document.getElementById("notif").innerHTML = notif.innerHTML;
    setTimeout(function() {
        win.document.getElementById("notif").innerHTML = "";
    }, 3000);
};


like.onclick = function() {
    videoBar.children[0].click();
    win.document.getElementById("notif").innerHTML = notif.innerHTML;
    setTimeout(function() {
        win.document.getElementById("notif").innerHTML = "";
    }, 3000);
};

dislike.onclick = function() {
    videoBar.children[1].click();
    win.document.getElementById("notif").innerHTML = notif.innerHTML;
    setTimeout(function() {
        win.document.getElementById("notif").innerHTML = "";
    }, 3000);
};

play_btn.onclick = function() {
    play.click();
};
restart_btn.onclick = function() {
    video.currentTime = 0.5;
};
end_btn.onclick = function() {
    video.currentTime = video.duration;
};
forward.onclick = function() {
    video.currentTime = video.currentTime + 15;
};
rewind.onclick = function() {
    video.currentTime = video.currentTime - 15;
};

mute_btn.onclick = function() {
    let muteBtn = document.querySelector(".ytp-mute-button");
    muteBtn.click();
};

var intervalID = window.setInterval(repeat, 500);

/* skip ads */
let mutedBecauseAd = false;
var skipAds = setInterval(() => {
    clickSkipButton();
    closeBannerAd();
    muteIfAdRunning();
}, 500);

function clickSkipButton() {
    if (document.getElementsByClassName("video-ads")[0].innerHTML !== "") {
        var banner = false;
        for (var i = 0; i < document.getElementsByClassName("ytp-ad-overlay-close-button").length; i++) {
            document.getElementsByClassName("ytp-ad-overlay-close-button")[i].click();
            banner = true;
        }
        if (banner === false) {
            document.getElementsByClassName("html5-main-video")[0].currentTime = document.getElementsByClassName("html5-main-video")[0].duration;
            document.getElementsByClassName("ytp-ad-skip-button")[0].click();
        }
    }
    let b = [...document.querySelectorAll('button')]
        .filter(x => ~x.textContent.search(/[sS]kip [aA]d/))[0];
    if (b) b.click();
}

function closeBannerAd() {
    let b2 = document.querySelector(".ytp-ad-overlay-close-button");
    // @ts-ignore
    if (b2) b2.click();
}

function muteIfAdRunning() {
    //also unmutes if Ad not running
    let adElem = [...document.querySelectorAll(".ytp-ad-text")]
        .filter((ad => ad.textContent.length < 5))[0];
    let muteBtn = document.querySelector(".ytp-mute-button");
    let adRunning = !!adElem;
    if (adRunning) {
        let isMuted = !!~muteBtn.ariaLabel.toLowerCase().search("unmute");
        if (!isMuted) {
            muteBtn.click();
            mutedBecauseAd = true;
        }
    } else {
        if (mutedBecauseAd) {
            muteBtn.click();
            mutedBecauseAd = false;
        }
    }
}

function extractVideoID(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length == 11) {
        return match[7];
    } else {
        console.log("Not found");
    }
}

function mode(mode) {
    var buttons = win.document.querySelectorAll("button");
    var sliders = win.document.getElementsByClassName("myslider");
    var options = win.document.querySelectorAll("option");
    var selects = win.document.querySelectorAll("select");
    var labels = win.document.querySelectorAll("label");
    if (mode == "dark") {
        win.document.body.style.backgroundColor = "black";
        win.document.body.style.color = "white";
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = "#404040";
        }
        for (var x = 0; x < sliders.length; x++) {
            sliders[x].style.backgroundColor = "#424242";
            sliders[x].style.setProperty('--slider-color', "#545454");
            sliders[x].style.setProperty('--slider-color-active', "#595959");
        }
        for (var y = 0; y < options.length; y++) {
            options[y].style.backgroundColor = "#424242";
            options[y].style.color = "white";
        }
        for (var z = 0; z < options.length; z++) {
            selects[z].style.backgroundColor = "#424242";
            selects[z].style.color = "white";
        }
        for (var v = 0; v < labels.length; v++) {
            labels[v].style.setProperty("--thumb-color", "#545454");
        }
    } else {
        win.document.body.style.backgroundColor = "white";
        win.document.body.style.color = "black";
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = "#f44336";
        }
        for (var x = 0; x < sliders.length; x++) {
            sliders[x].style.backgroundColor = "#ff3700";
            sliders[x].style.setProperty('--slider-color', "#ff5f33");
            sliders[x].style.setProperty('--slider-color', "#ff7f5c;");
        }
        for (var y = 0; y < options.length; y++) {
            options[y].style.backgroundColor = "white";
            options[y].style.color = "black";
        }
        for (var z = 0; z < options.length; z++) {
            selects[z].style.backgroundColor = "white";
            selects[z].style.color = "black";
        }
        for (var v = 0; v < labels.length; v++) {
            labels[v].style.setProperty("--thumb-color", "white");
        }
    }
}

/* other */
function repeat() {
    win.document.getElementById("playBackVal").innerHTML = "Playback Speed : " + speed.value;
    win.document.getElementById("volumeVal").innerHTML = "Volume : " + vol.value;
    win.document.getElementById("bassBoostVal").innerHTML = "Bass Boost : " + bassBoost.value;
    win.document.getElementById("pannerVal").innerHTML = "Panning : " + pannerControl.value;
    settingsData = (speed.value + "\n" + vol.value + "\n" + bassBoost.value + "\n" + pannerControl.value + "\n" + audioFilter.options[audioFilter.selectedIndex].text);
    videoIndex = document.querySelectorAll("[id='publisher-container']")[1].children[2].getElementsByClassName("index-message")[0].innerHTML.split(" / ");
    if (videoIndex == null) {
        //do stuff
        win.document.getElementById("upNext").innerHTML = "Up Next: " + next[0].innerHTML;
    } else if (videoIndex[0] == videoIndex[1]) {
        win.document.getElementById("upNext").innerHTML = "Up Next: " + next[0].innerHTML;
    } else if (videoIndex[0] != videoIndex[1]) {
        win.document.getElementById("upNext").innerHTML = "Up Next: " + next[parseInt(videoIndex[0])].innerHTML;
    } else {
        win.document.getElementById("upNext").innerHTML = " ";
    }
    for (var i = 0; i < allSliders.length; i++) {
        var isFocused = (win.document.activeElement === allSliders[i]);
        if (!isFocused) {
            speed.value = video.playbackRate;
            vol.value = video.volume;
            slider.value = video.currentTime;
        }
    }
    slider.max = video.duration;
    next = document.querySelectorAll("[id='video-title']");
    var text = "textContent" in document.body ? "textContent" : "innerText";
    win.document.title = 'Now Playing - ' + document.getElementsByTagName("h1")[1][text];
    win.document.getElementById('nowPlaying').innerHTML = 'Now Playing - ' + document.getElementsByTagName("h1")[1][text];
    thumbnailImg = `https://img.youtube.com/vi/${extractVideoID(window.location.href)}/0.jpg`;
    uploader = document.querySelectorAll("[id='top-row']")[1].querySelectorAll("[id='upload-info']")[0].querySelectorAll("a")[0].innerHTML;
    win.document.getElementById("uploader").innerHTML = "Uploader : " + uploader;
    if (showThumbnail) {
        win.document.getElementById("thumbnail").style.visibility = "visible";
        win.document.getElementById("thumbnail").src = thumbnailImg;
    } else {
        win.document.getElementById("thumbnail").style.visibility = "hidden";
    }
    
    darkMode = win.document.getElementById("darkmode");
    if (next[parseInt(videoIndex[0]) - 1] == null) {
        videoSelect.value = next[0].innerHTML;
    } else {
        videoSelect.value = next[parseInt(videoIndex[0]) - 1].innerHTML;
    }
    var notificationDelay;
    if (notification != document.querySelectorAll("tp-yt-paper-toast")[1].querySelectorAll("yt-formatted-string")[0].innerHTML) {
        notification = document.querySelectorAll("tp-yt-paper-toast")[1].querySelectorAll("yt-formatted-string")[0].innerHTML;
        if (darkMode.checked) {
            win.document.getElementById("notif").innerHTML = "<div style='width:100px; height:40px; background-color:#1f1f1f; text-align: center; line-height:40px;'>" + notification + "</div>";
        } else {
            win.document.getElementById("notif").innerHTML = "<div style='width:100px; height:40px; background-color:grey; text-align: center; line-height:40px;'>" + notification + "</div>";
        }

        clearTimeout(notificationDelay);
        notificationDelay = setTimeout(function() {
            win.document.getElementById("notif").innerHTML = "";
        }, 4000);
    }

    confirmDialog = document.querySelectAll("yt-confirm-dialog-renderer")[0].querySelectorAll("tp-yt-paper-button")[0];
    if (confirmDialog != null) {
        confirmDialog.click();
    }
    getCaptionsConst();
    if (caption != null) {
        win.document.getElementById("captions").innerHTML = caption;
    } else {
        win.document.getElementById("captions").innerHTML = "";
    }
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: document.getElementsByTagName("h1")[1][text],
            artist: 'Youtube',
            album: '',
            artwork: [{
                src: thumbnailImg,
                sizes: '96x96',
                type: 'image/png'
            }, ]
        });
    }
    //urlChange();
}

var history = window.history;
var pushState = history.pushState;
history.pushState = function(state) {
    urlChange();
    return pushState.apply(history, arguments);
};

function urlChange() {
    video = document.getElementsByClassName("html5-main-video")[0];
    videoBar = document.getElementsByClassName("ytd-menu-renderer")[0];
    playlist = document.querySelectorAll("[id='top-level-buttons-computed']")[1];
    notif = document.querySelectorAll("tp-yt-paper-toast")[0].children[0];
    subscribe = document.getElementsByClassName("ytd-subscribe-button-renderer")[0];
    next = document.querySelectorAll("[id='video-title']");
    videoIndex = document.querySelectorAll("[id='publisher-container']")[1].children[2].getElementsByClassName("index-message")[0].innerHTML.split(" / ")[0];
    startVolume = video.volume;
    playBackSpeed = video.playbackRate;
    play = document.getElementsByClassName('ytp-play-button')[0];
    videoDur = video.duration
    loopVideo = video.loop;
    thumbnailImg = `https://img.youtube.com/vi/${extractVideoID(window.location.href)}/0.jpg`;
    url = window.location.href;
    for (var x = 0; x < videoSelect.options.length; x++) {
        videoSelect.remove(videoSelect.options[x]);
    }
    setVideos();
}

function getCaptionsConst() {
    caption = document.getElementsByClassName("ytp-caption-segment")[0].innerHTML;
    caption = caption + "<br>" + document.getElementsByClassName("ytp-caption-segment")[1].innerHTML;
}

function setVideos() {
    var videoArr = document.querySelectorAll("[id='publisher-container']")[1].children[2].getElementsByClassName("index-message")[0].innerHTML.split(" / ");
    var playlistLength = videoArr[1];
    var playlistCurrent = videoArr[0];
    for (var i = 0; i < parseInt(playlistLength); i++) {
        var option = win.document.createElement("option");
        option.innerHTML = next[i].innerHTML;
        option.value = next[i].innerHTML;
        videoSelect.appendChild(option);
    }
}

//cookies
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function init() {
    setVideos();
    darkMode.checked = eval(getCookie("darkmode"));
    adblock.checked = eval(getCookie("adblock"));
    if (darkMode.checked) {
        mode("dark");
    } else {
        mode("light");
    }
    if (adblock.checked) {
        skipAds = setInterval(() => {
            clickSkipButton();
            closeBannerAd();
            muteIfAdRunning();
        }, 500);
    } else {
        clearInterval(skipAds);
    }
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: document.getElementsByTagName("h1")[1].innerHTML,
            artist: 'Youtube',
            album: '',
            artwork: [{
                src: thumbnailImg,
                sizes: '96x96',
                type: 'image/png'
            }, ]
        });

        navigator.mediaSession.setActionHandler('play', function() {
            play.click();
        });
        navigator.mediaSession.setActionHandler('pause', function() {
            play.click();
        });
        navigator.mediaSession.setActionHandler('stop', function() {
            play.click();
        });
        navigator.mediaSession.setActionHandler('seekbackward', function() {
            video.currentTime = video.currentTime - 15;
        });
        navigator.mediaSession.setActionHandler('seekforward', function() {
            video.currentTime = video.currentTime + 15;
        });
        navigator.mediaSession.setActionHandler('seekto', function() {});
        navigator.mediaSession.setActionHandler('previoustrack', function() {
            video.currentTime = 0.5;
        });
        navigator.mediaSession.setActionHandler('nexttrack', function() {
            video.currentTime = video.duration;
        });
        navigator.mediaSession.setActionHandler('skipad', function() {
            /* Code excerpted. */
        });
    }
}

function handleDataAvailable(event) {
    if (event.data.size > 0) {
        recordedChunks.push(event.data);
        download();
    } else {
        // ...
    }
}

function downloadFile(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function download() {
    var blob = new Blob(recordedChunks, {
        type: "video/webm"
    });
    recordedChunks = [];
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "video.webm";
    a.click();
    window.URL.revokeObjectURL(url);
    //reset
    stream = null;
    recordedChunks = null;
    options = null;
    mediaRecorder = null;
    mediaRecorder.ondataavailable = null;
    stream = video.captureStream(25);
    recordedChunks = [];
    options = {
        mimeType: "video/webm; codecs=vp9"
    };
    mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.ondataavailable = handleDataAvailable;
}

function enterPictureInPicture() {
  video.requestPictureInPicture()
    .then(pictureInPictureWindow => {
      pictureInPictureWindow.addEventListener("resize", () => onPipWindowResize(), false);
  })
}

function exitPictureInPicture() {
  document.exitPictureInPicture();
}

function shutdown() {
  audioContext.close();
}

win.document.onload = init();
win.document.onbeforeunload = shutdown();

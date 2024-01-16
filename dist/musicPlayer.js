var backgroundMusic = document.getElementById("backgroundMusic");
var muteButton = document.getElementById("muteButton");
var nextTrackButton = document.getElementById("nextTrackButton");
var playPauseButton = document.getElementById("playPauseButton");
var isMuted = false;
var isPlaying = false;
var currentTrack = 1; 

document.addEventListener("DOMContentLoaded", function () {
  var initialVolume = 0.1;
  var backgroundMusic = document.getElementById("backgroundMusic");
  var volumeInput = document.getElementById("volume");
  volumeInput.value = initialVolume;
  backgroundMusic.volume = initialVolume;
});

backgroundMusic.addEventListener('canplay', function() {
  console.log('Audio can play.');
});

function changeVolume() {
  var volumeInput = document.getElementById("volume");
  backgroundMusic.volume = volumeInput.value;
}

function toggleMute() {
  isMuted = !isMuted;
  backgroundMusic.muted = isMuted;
  updateMuteButton();
}

function updateMuteButton() {
  var muteIcon = isMuted ? "fa-volume-mute" : "fa-volume-up";
  muteButton.innerHTML = `<i class="fas ${muteIcon}"></i>`;
}

function nextTrack() {
  currentTrack = (currentTrack % 3) + 1;
  backgroundMusic.src = `bgMusic/BGM-${currentTrack}.mp3`;
  var wasPlaying = !backgroundMusic.paused;
  backgroundMusic.load();
  backgroundMusic.play();
  if (wasPlaying) {
    backgroundMusic.play();
  }
  updatePlayPauseButton();
}

function togglePlayPause() {
  if (isPlaying) {
    backgroundMusic.pause();
  } else {
    backgroundMusic.play();
  }
  isPlaying = !isPlaying;
  updatePlayPauseButton();
}

function updatePlayPauseButton() {
  var playPauseIcon = isPlaying ? "fa-pause" : "fa-play";
  playPauseButton.innerHTML = `<i class="fas ${playPauseIcon}"></i>`;
}
    
  
    
   
    
    
    
  
  

    


  
   
  
    
  
    
    
    


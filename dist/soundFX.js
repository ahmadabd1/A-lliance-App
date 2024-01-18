document.addEventListener('DOMContentLoaded', function () {
    var buttonClickSound = document.getElementById('buttonClickSound');
    var buttons = document.querySelectorAll('#start-button, #continue-button');

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            buttonClickSound.play();
        });
    });
});

function playAudio() {
    var audio = document.getElementById("audioPlayer");
    
    // Log the current source to the console for debugging
    console.log("Current source:", audio.currentSrc);

    audio.style.display = "block";
    audio.play();
}

function audioReady() {
    console.log("Audio is ready to play.");
}
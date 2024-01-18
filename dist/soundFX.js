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
    
    
    

    audio.style.display = "block";
    audio.pause();
}

function audioReady() {

}
document.addEventListener("DOMContentLoaded", function () {
    

    const startButton = document.getElementById("start-button");
    const continueButton = document.getElementById("continue-button");
    const sportsButton = document.getElementById("sports-button");
    const historyButton = document.getElementById("history-button");
    const vehiclesButton = document.getElementById("vehicles-button");
    const startingMenu = document.getElementById("starting-menu");
    const introPage = document.getElementById("intro-page");
    const gameContainer = document.getElementById("game-container");


    startButton.addEventListener("click", function () {
        startingMenu.style.display = "none"; 
        introPage.classList.add("active");
    });

    continueButton.addEventListener("click", function () {
        $.get("/data")
        introPage.classList.remove("active");
        gameContainer.style.display = "block"; 
        gameContainer.classList.add("active");
        audioPlayer.pause();
        backgroundMusic.play();
    });

    sportsButton.addEventListener("click", function () {
        $.get("/categories/Sports")
        introPage.classList.remove("active");
        gameContainer.style.display = "block"; 
        gameContainer.classList.add("active");
        audioPlayer.pause();
        backgroundMusic.play();
    });

    historyButton.addEventListener("click", function () {
        $.get("/categories/History")
        introPage.classList.remove("active");
        gameContainer.style.display = "block";
        gameContainer.classList.add("active");
        audioPlayer.pause();
        backgroundMusic.play();
    });

    vehiclesButton.addEventListener("click", function () {
        $.get("/categories/Vehicles")
        introPage.classList.remove("active");
        gameContainer.style.display = "block"; 
        gameContainer.classList.add("active");
        audioPlayer.pause();
        backgroundMusic.play();
    });
    

    
});

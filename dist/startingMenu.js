document.addEventListener("DOMContentLoaded", function () {
    console.log("Starting Menu script loaded");

    const startButton = document.getElementById("start-button");
    const continueButton = document.getElementById("continue-button");
    const startingMenu = document.getElementById("starting-menu");
    const introPage = document.getElementById("intro-page");
    const gameContainer = document.getElementById("game-container");

    console.log("startButton:", startButton);
    console.log("continueButton:", continueButton);

    startButton.addEventListener("click", function () {
        startingMenu.style.display = "none"; // Hide the starting menu
        introPage.classList.add("active");
    });

    continueButton.addEventListener("click", function () {
        introPage.classList.remove("active");
        gameContainer.style.display = "block"; // Show the game container
        gameContainer.classList.add("active");
    });
    

    // ... (rest of your code)
});

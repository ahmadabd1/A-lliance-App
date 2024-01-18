function logToGame(message , color) {
    console.log(message);
    var gameLog = document.getElementById('game-log');
    if (gameLog) {
        var newLog = document.createElement('p');
        newLog.style.color = color;
        newLog.textContent = message;
        gameLog.appendChild(newLog);
        gameLog.offsetHeight;
    } else {
        console.error('Game log element not found.');
    }
}
logToGame('Game started.');

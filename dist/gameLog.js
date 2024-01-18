function logToGame(message) {
    console.log(message);
    var gameLog = document.getElementById('game-log');
    if (gameLog) {
        var newLog = document.createElement('p');
        newLog.textContent = message;
        gameLog.appendChild(newLog);
        gameLog.offsetHeight;
    } else {
        console.error('Game log element not found.');
    }
}
logToGame('Game started.');

async function rollDice(number) {
    const dice = await[...document.querySelectorAll(".die-list")];
    return dice.forEach(die => {
        toggleClasses(die);
        die.dataset.roll = number;
    });
}
function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
}

$("#checkbox").on("change", function () {
    $("body").toggleClass("dark");
});
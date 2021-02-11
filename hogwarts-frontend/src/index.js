
const api = new APIAdapter
const game = new Game

document.addEventListener("DOMContentLoaded", () => {
    api.getUsers().then((users => {
LeaderboardDisplay.createLDisplay(users)
}))
const buttons = new GameButtons()
LoginDisplay.createLoginDisplay()
 });


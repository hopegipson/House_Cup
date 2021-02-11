class LeaderboardDisplay {

    static createLDisplay = (users) => {
        const leaderboardDisplay = new LeaderboardDisplay
        leaderboardDisplay.nonUnsortedUsers = users.filter(user => user.house.id != 1)
        leaderboardDisplay.createUserLeaderboard(0, "User Leaderboard")
        leaderboardDisplay.gryffindorBanner = document.getElementById('gryffindorbutton')
        leaderboardDisplay.slytherinBanner = document.getElementById('slytherinbutton')
        leaderboardDisplay.hufflepuffBanner = document.getElementById('hufflepuffbutton')
        leaderboardDisplay.ravenclawBanner = document.getElementById('ravenclawbutton')
        leaderboardDisplay.hogwartsBanner = document.getElementById('hogwartsbutton')
        leaderboardDisplay.housecupBanner = document.getElementById('housecupbutton')
        leaderboardDisplay.addListenerstoButtons()
   }

    createUserLeaderboard = (id, title) => {
        let selectedUsers
        if (id != 0)  {selectedUsers = this.nonUnsortedUsers.filter(user => user.house.id === id) }
        else {selectedUsers = this.nonUnsortedUsers}
        let usersForLeaderBoard = selectedUsers.map(user => {return new User(user)})
        this.leaderboardUsers = new Leaderboard(usersForLeaderBoard, title); 
        this.leaderboardUsers.appendLeaderBoardToDOM()
    }

    createHouseLeaderboard = () => {
        api.getHouses().then((houses => {
            let housesArray = []
            houses.forEach(house => {
                if (house.id != 1){
                    housesArray.push(house)
                }
            })
            this.leaderboardHouse = new HouseLeaderboard(housesArray, "House Cup Leaderboard"); 
            this.leaderboardHouse.appendLeaderBoardToDOM()
            }))
    }

    addListenerstoButtons = () => {
        this.gryffindorBanner.addEventListener("click", this.createUserLeaderboard.bind(event, 2, "Gryffindor Leaderboard"))
        this.slytherinBanner.addEventListener("click", this.createUserLeaderboard.bind(event, 3, "Slytherin Leaderboard"))
        this.ravenclawBanner.addEventListener("click", this.createUserLeaderboard.bind(event, 4, "Ravenclaw Leaderboard"))
        this.hufflepuffBanner.addEventListener("click", this.createUserLeaderboard.bind(event, 5, "Hufflepuff Leaderboard"))
        this.hogwartsBanner.addEventListener("click", this.createUserLeaderboard.bind(event, 0, "Users Leaderboard"))
        this.housecupBanner.addEventListener("click", this.createHouseLeaderboard)
    }
}
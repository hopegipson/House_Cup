class LeaderboardDisplay {

    static createLDisplay = () => {
        const leaderboardDisplay = new LeaderboardDisplay
        leaderboardDisplay.createUserLeaderboard()
        //leaderboardDisplay.createGryffindorLeaderboard()
        leaderboardDisplay.gryffindorBanner = document.getElementById('gryffindorbutton')
        leaderboardDisplay.slytherinBanner = document.getElementById('slytherinbutton')
        leaderboardDisplay.hufflepuffBanner = document.getElementById('hufflepuffbutton')
        leaderboardDisplay.ravenclawBanner = document.getElementById('ravenclawbutton')
        leaderboardDisplay.hogwartsBanner = document.getElementById('hogwartsbutton')
        leaderboardDisplay.housecupBanner = document.getElementById('housecupbutton')
        leaderboardDisplay.addListenerstoButtons()





        console.log(leaderboardDisplay.gryffindorBanner)
        // leaderboardDisplay.createGryffindorLeaderboard()
      //  this.gryffindorBanner = document.getElementById('gryffindor')
       // this.hufflepuffBanner = document.getElementById('hufflepuff')
   }

    createUserLeaderboard = () => {
        api.getUsers().then((users => {
            let nonUnsortedUsers = []
            users.forEach(user => {
            if (user.house.id != 1){
            nonUnsortedUsers.push(user)
            }
        })
        this.leaderboardUsers = new Leaderboard(nonUnsortedUsers, "User Leaderboard"); 
       this.leaderboardUsers.appendLeaderBoardToDOM()
    }))
    }

    createGryffindorLeaderboard = () => {
        api.getUsers().then((users => {
            let GryffindorUsers = []
            users.forEach(user => {
                if (user.house.id === 2){
                    GryffindorUsers.push(user)
            }
            })
           // console.log(GryffindorUsers)
        this.leaderboardGryffindor = new Leaderboard(GryffindorUsers, "Gryffindor Leaderboard"); 
        this.leaderboardGryffindor.appendLeaderBoardToDOM()
        }))
    }

    createSlytherinLeaderboard = () => {
        api.getUsers().then((users => {
            let SlytherinUsers = []
            users.forEach(user => {
                if (user.house.id === 3){
                    SlytherinUsers.push(user)
            }
            })
        this.leaderboardSlytherin = new Leaderboard(SlytherinUsers, "Slytherin Leaderboard"); 
        this.leaderboardSlytherin.appendLeaderBoardToDOM()
        }))
    }

    createRavenclawLeaderboard = () => {
        api.getUsers().then((users => {
            let RavenclawUsers = []
            users.forEach(user => {
                if (user.house.id === 4){
                    RavenclawUsers.push(user)
            }
            })
        this.leaderboardRavenclaw = new Leaderboard(RavenclawUsers, "Ravenclaw Leaderboard"); 
        this.leaderboardRavenclaw.appendLeaderBoardToDOM()
        }))
    }

    createHufflepuffLeaderboard = () => {
        api.getUsers().then((users => {
            let HufflepuffUsers = []
            users.forEach(user => {
                if (user.house.id === 5){
                    HufflepuffUsers.push(user)
            }
            })
        this.leaderboardHufflepuff = new Leaderboard(HufflepuffUsers, "Hufflepuff Leaderboard"); 
        this.leaderboardHufflepuff.appendLeaderBoardToDOM()
        }))
    }

    createHouseLeaderboard = () => {
        api.getHouses().then((houses => {
            let housesArray = []
            houses.forEach(house => {
                if (house.id != 1){
                    housesArray.push(house)
                }
            })
            console.log(housesArray)
            this.leaderboardHouse = new HouseLeaderboard(housesArray, "House Cup Leaderboard"); 
            this.leaderboardHouse.appendLeaderBoardToDOM()
            }))
    }


    addListenerstoButtons = () => {
        this.gryffindorBanner.addEventListener("click", this.createGryffindorLeaderboard)
        this.slytherinBanner.addEventListener("click", this.createSlytherinLeaderboard)
        this.ravenclawBanner.addEventListener("click", this.createRavenclawLeaderboard)
        this.hufflepuffBanner.addEventListener("click", this.createHufflepuffLeaderboard)
        this.hogwartsBanner.addEventListener("click", this.createUserLeaderboard)
        this.housecupBanner.addEventListener("click", this.createHouseLeaderboard)

    }



}
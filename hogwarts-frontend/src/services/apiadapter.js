class APIAdapter {
    constructor(port = 3000) {
        this.port = port
        this.url = `http://localhost:${port}`
      }

    parseJSON = res => res.json()

    headers = {"Accepts":"application/json", "Content-Type": "application/json"}

    get usersURL(){
        return this.url + `/users`
    }

    get housesURL(){
        return this.url + `/houses`
    }

    get quizzesURL(){
        return this.url + `/quizzes`
    }

    getQuizzes = () => fetch(this.quizzesURL).then(this.parseJSON)
    getQuiz = (quizID) => fetch(this.quizzesURL + `/${quizID}`).then(this.parseJSON)
  
    getHouses = () => fetch(this.housesURL).then(this.parseJSON)
    getHouse = (houseID) => fetch(this.housesURL + `/${houseID}`).then(this.parseJSON)
    
    getUsers = () => fetch(this.usersURL).then(this.parseJSON)
    getUser = (userID) => fetch(this.usersURL + `/${userID}`).then(this.parseJSON)
}
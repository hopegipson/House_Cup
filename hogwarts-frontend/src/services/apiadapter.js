class APIAdapter {
    constructor(port = 3000) {
        this.port = port
        this.url = `http://localhost:${port}`
      }

      parseJSON = response => {
        if (response.status === 200){
          return response.json()
        }
        else {
          this.catch(response)
          .then(response => console.log(response.error))
        }
      }
      
      catch = response => response.json()
    
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

    get scoresURL(){
        return this.url + `/scores`
    }

    getQuizzes = () => fetch(this.quizzesURL).then(this.parseJSON)
    getQuiz = (quizID) => fetch(this.quizzesURL + `/${quizID}`).then(this.parseJSON)
  
    getHouses = () => fetch(this.housesURL).then(this.parseJSON)
    getHouse = (houseID) => fetch(this.housesURL + `/${houseID}`).then(this.parseJSON)
    
    getUsers = () => fetch(this.usersURL).then(this.parseJSON)
    getUser = (userID) => fetch(this.usersURL + `/${userID}`).then(this.parseJSON)

    patchUserScore = (id, score) => fetch(this.usersURL + `/${id}`, {
        method: 'PATCH',
       headers: this.headers,
        body: JSON.stringify({user_info_score: {
       scores: score}
      })
      })
      .then(this.parseJSON)

      patchUserHouse = (id, house) => fetch(this.usersURL + `/${id}`, {
        method: 'PATCH',
       headers: this.headers,
        body: JSON.stringify({user_info_score: {
       house_id: house}
      })
      })
      .then(this.parseJSON)

      postUser = (username, patronus) => fetch(this.usersURL, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
            user_info: {
              user_username: username,
              user_patronus: patronus
            }
          })
      })
      .then(this.parseJSON)

      postScore = (numberCorrect, user_id) => fetch(this.scoresURL, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
            score_info: {
              number_correct: numberCorrect,
              user_id: user_id,
            }
          })
      })
      .then(this.parseJSON)

      deleteScore = (id) => fetch(this.scoresURL + `/${id}`, {
        method: 'DELETE',
        headers: this.headers,
      })
      .then(data => console.log("Deleted"))
      .catch(function(error){
          console.log(error)})

}
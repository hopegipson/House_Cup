class User {

    constructor(user){
      this.username = user.username
      this.patronus = user.patronus
      this.house = user.house
      this.scores = user.scores

      if (user.scores.length === 0){
        this.highest_score = 0
        this.house_points = 0
      }
      else{
        this.getHighestScore()
      this.getHousePoints()
      }
      this.id = user.id
    }

    getHighestScore = () => {
     let numberArray = []
     this.scores.forEach(score => {
      numberArray.push(score.number_correct)
     })
      this.highest_score = Math.max(...numberArray)
    }

    getHousePoints = () => {
    // let numberArray = this.scores.map(score => {
    //   return score.house_points})
    this.house_points =  this.scores.reduce((a, b) => a + b.house_points, 0)
    return this.house_points

      this.house_points =  this.scores.map(score => {
        return score.house_points}).reduce((a, b) => a + b, 0)
    }

  removeScores = () => {
    this.scores.forEach(score =>
      api.deleteScore(score.id)
    )
    this.scores =[]
  }



}
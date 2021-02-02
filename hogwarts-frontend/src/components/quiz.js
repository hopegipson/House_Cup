class Quiz {
    constructor(quiz){
        this.quizContainer = document.getElementById('contain')
        this.quizElement = document.getElementById('quiz');
        this.id = quiz.id
        this.slides = []
        this.questions = []
        this.createQuestions(quiz)
        this.createButtons()
        this.currentSlide = 0
        this.numberCorrect = 0
        this.gryffindorCount = 0;
        this.slytherinCount = 0;
        this.hufflepuffCount = 0;
        this.ravenclawCount = 0;
        this.resultsContainer = document.getElementById('results')
        this.showSlide(0)
    }


    createQuestions = (quiz) => {
        quiz.questions.forEach((currentQuestion) => {
            const question1 = new Question(currentQuestion)
           this.slides.push(question1.slide)
           this.questions.push(question1)
           this.quizElement.appendChild(question1.slide)
        })
    }

    createButtons = () => {
        this.prevBtn = document.createElement('button')
        this.prevBtn.innerHTML = "Previous Question"
        this.prevBtn.id = 'previous'
        this.prevBtn.addEventListener("click", this.showPreviousSlide)
    
        this.nextBtn = document.createElement('button')
        this.nextBtn.innerHTML = "Next Question"
        this.nextBtn.id = 'next'
        this.nextBtn.addEventListener('click', this.showNextSlide)
    
        this.submitBtn = document.createElement('button')
        this.submitBtn.classList.add('submitQuiz');
        this.submitBtn.setAttribute('quiz-id' , this.id); 
        this.submitBtn.innerHTML = "Submit Quiz"
        this.submitBtn.id = 'submit'
        this.submitBtn.addEventListener("click", this.resultQuiz)
        this.quizContainer.append(this.prevBtn)
        this.quizContainer.append(this.nextBtn)
        this.quizContainer.append(this.submitBtn)
    }

    showSlide = (n) => {
        this.slides[this.currentSlide].classList.remove('slide-activated');
        this.slides[n].classList.add('slide-activated');
        this.currentSlide = n;
        if(this.currentSlide === 0){
          this.prevBtn.style.display = 'none';
        }
        else{
          this.prevBtn.style.display = 'inline-block';
        }
        if(this.currentSlide === this.slides.length-1){
          this.nextBtn.style.display = 'none';
          this.submitBtn.style.display = 'inline-block';
        }
        else{
          this.nextBtn.style.display = 'inline-block';
          this.submitBtn.style.display = 'none';
        }
      }
      
    showNextSlide = () => {
       this.showSlide(this.currentSlide + 1);
      }
      
    showPreviousSlide = () => {
        this.showSlide(this.currentSlide - 1);
      }

    resultQuiz = () => {
        if (this.id === 1){
            this.renderResults()
        }
        else if (this.id === 2){
            this.renderHouseResults()
        }
    }

    renderResults = () => {

    const answersOnPage = document.getElementsByClassName('answers')

    console.log(this.questions)
    this.questions.forEach((currentQuestion, questionIndex) => {
    const answerI = answersOnPage[questionIndex]
      let userAnswer = 0
      for (var i = 0, length = answerI.childElementCount; i < length; i+=2) {
        console.log(answerI.children[i].children[0].checked)
        if (answerI.children[i].children[0].checked) {
       userAnswer = (answerI.children[i].children[0].value);
        }
        else if (answerI.children[i].children[0].checked == false){
          answerI.children[i].children[0].disabled = true
        }
      }
      console.log(userAnswer)
      if(userAnswer === currentQuestion.correct_answer){
        this.numberCorrect++;
        answersOnPage[questionIndex].style.color = 'lightgreen';
      }
      else{
        answersOnPage[questionIndex].style.color = 'red';
      }
    });
    this.resultsContainer.innerHTML = `${this.numberCorrect} out of ${this.questions.length}`;
    if (( game.user === "None") || (game.user.house.id === 1)){
      console.log("no need to save result")
    }
    else{
     //let userNumber = this.resultsContainer.attributes[1].value
     this.addScoreToUser(game.user.id, this.numberCorrect)
    }

  }

  addScoreToUser = (user, score) =>{
    api.patchUserScore(user, score)
    .then(function(user){
    this.updateDomWithResults(user)  
  })
    }

  updateDomWithResults(userObject){
      let highScoreButton = document.getElementById('high_score')
      highScoreButton.innerHTML = `User High Score: ${userObject.highest_score}`
      let pointsUserCard = document.getElementById('pointsUserCard')
      pointsUserCard.innerHTML = `${userObject.house_points} points earned for the House Cup.`
      let listItemHighScore = document.getElementById('listItemHighScore')
      listItemHighScore.innerHTML = `Highest Score: ${userObject.highest_score}`
    }

  renderHouseResults = (quiz) =>{
    const answersOnPage = document.getElementsByClassName('answers')
    this.questions.forEach( (currentQuestion, questionIndex) => {
  
      const answerI = answersOnPage[questionIndex];
      let userAnswer = 0
      for (var i = 0, length = answerI.childElementCount; i < length; i+=2) {
        if (answerI.children[i].children[0].checked) {
        userAnswer = (answerI.children[i].children[0].value);
        }
        else if (answerI.children[i].children[0].checked == false){
          answerI.children[i].children[0].disabled = true
        }
      }


      if(userAnswer === currentQuestion.gryffindor_answer){
       this.gryffindorCount++;
      }
      else if (userAnswer === currentQuestion.slytherin_answer){
        this.slytherinCount++;
      }
      else if (userAnswer === currentQuestion.hufflepuff_answer){
        this.hufflepuffCount++;
      }
      else if (userAnswer === currentQuestion.ravenclaw_answer){
        this.ravenclawCount++;
      }
    });

   let chosenHouse = this.calculateHouseResults()

  
      if (game.user === "None"){
        console.log("no need to save result")
      }
      else{ addHouseToUser(game.user.id, chosenHouse)
      }
    }

    addHouseToUser = (user, house) =>{
      api.patchUserHouse(user, house)
      .then(function(user){
        appendDOMWithChosenHouse(user)  
      })
    }


 appendDOMWithChosenHouse = (userObject) => {
    this.resultsContainer.innerHTML = `${userObject.house.name} is your new House! ${userObject.house.house_information}`;
    let cardHouseName = document.getElementById('cardHouseName')
    cardHouseName.innerHTML = `${userObject.house.name}`
    cardHouseName.color = userObject.house.primary_color
  }



calculateHouseResults = () =>{
     let largestNumber = Math.max(this.gryffindorCount, this.slytherinCount, this.hufflepuffCount, this.ravenclawCount)
      let house = []
      console.log(largestNumber)
      if (this.gryffindorCount === largestNumber){ house.push("Gryffindor")}
      if (this.slytherinCount === largestNumber){ house.push("Slytherin")}
      if (this.ravenclawCount === largestNumber){ house.push("Ravenclaw")}
      if (this.hufflepuffCount === largestNumber){ house.push("Hufflepuff")}
      if (house.length === 1){
        return house[0]
      }
      else {
        return house[Math.floor(Math.random()*house.length)]
      }
      }
    

  
}
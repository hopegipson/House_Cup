class Quiz {
    constructor(quiz){
        this.quizContainer = document.getElementById('contain')
        this.quizElement = document.getElementById('quiz');
        this.id = quiz.id
        this.slides = []
        this.questions = []
        this.pickFiveQuestions(quiz)
        //this.pickTenQuestions(quiz)
        this.createQuestions()
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


    createQuestions = () => {
        this.selectedQuestions.forEach((currentQuestion) => {
            const question1 = new Question(currentQuestion)
           this.slides.push(question1.slide)
           this.questions.push(question1)
           this.quizElement.appendChild(question1.slide)
        })
    }

    getRandomIndex = (items) => {
      return Math.floor(Math.random() * items.length);
    }

    pickFiveQuestions = (quiz) => {
      this.selectedQuestions = []
      for (let i = 0; i < 5; i++) {
        let removedItem = quiz.questions.splice(this.getRandomIndex(quiz.questions), 1);
        this.selectedQuestions.push(removedItem[0])
      }
    }

    // pickTenQuestions = (quiz) => {
    //   this.selectedQuestions = []
    //   for (let i = 0; i < 10; i++) {
    //     let removedItem = quiz.questions.splice(this.getRandomIndex(quiz.questions), 1);
    //     this.selectedQuestions.push(removedItem[0])
    //   }
    // }

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
      this.submitBtn.disabled = true
        if (this.id === 1){
            this.renderResults()
        }
        else if (this.id === 2){          
            this.renderHouseResults()
        }
    }

    renderResults = () => {
    const answersOnPage = document.getElementsByClassName('answers')
    this.questions.forEach((currentQuestion, questionIndex) => {
    const answerI = answersOnPage[questionIndex]
      let userAnswer = 0
      for (var i = 0, length = answerI.childElementCount; i < length; i+=2) {
        if (answerI.children[i].children[0].checked) {
       userAnswer = (answerI.children[i].children[0].value);
        }
        else if (answerI.children[i].children[0].checked == false){
          answerI.children[i].children[0].disabled = true
        }
      }
      if(userAnswer === currentQuestion.correct_answer){
        this.numberCorrect++;
        answersOnPage[questionIndex].style.color = 'lightgreen';
      }
      else{
        answersOnPage[questionIndex].style.color = 'red';
      }
    });
    this.resultsContainer.innerHTML = `${this.numberCorrect} out of ${this.questions.length}`;
    this.resultsContainer.style.color = "purple"
      this.resultsContainer.classList.add('h5')
    if (( game.user === "None") || (game.user.house.id === 1)){
      console.log("no need to save result")
    }
    else{
      api.postScore(this.numberCorrect, game.user.id).then(function(scoreObject){
      api.getUser(game.user.id).then(function(userObject){
        let userUpdated = new User(userObject)
        game.setUser(userUpdated)
        LoginDisplay.resetForm()
        LoginDisplay.login(game.user)
        LeaderboardDisplay.createLDisplay()
      })
    })
    }

  }

  showWarningAboutChangingHouse = () => {
    api.getHouse(this.chosenHouse).then((houseObject) => {
      this.slides[this.currentSlide].classList.remove('slide-activated');
    this.prevBtn.style.display = 'none';
    this.submitBtn.style.display = 'none';
    this.resultSlide = document.createElement('div')
    this.resultSlide.classList.add('slide2');
    let li5 = document.createElement('li')
    li5.classList.add('list-group-item2')
    li5.innerHTML = `${houseObject.house_information}`
    let ul1 = document.createElement('ul')
    ul1.classList.add('list-group')
    ul1.classList.add('row')
    ul1.classList.add('list-group-flush')
    ul1.appendChild(li5)
    let row = document.createElement('div')
    row.classList.add('row')
    this.resultSlide.appendChild(row)
    this.resultSlide.appendChild(ul1)
    let urlPicture = houseObject.picture
    this.resultSlide.style.backgroundImage = `url('${houseObject.picture}')`;
    this.resultSlide.classList.add('slide-activated');
    let divbreaks = document.createElement('div')
    for (let i = 0; i < 4; i++) {
      divbreaks.appendChild(document.createElement("br"));
    }  
    const results = document.getElementById('results')
    results.appendChild(divbreaks)


    if (game.user === "None"){
      console.log("no need to save result")

      results.innerHTML += `${houseObject.name} has been picked as your hypothetical house! To save this result and have the option to join the house to unlock more information, please create a user.`;
    }
    else if (game.user.house.id == this.chosenHouse){
      results.innerHTML += `${houseObject.name} has been picked as your house! You are already a member of this house.`;
    }
    else{
      results.innerHTML += `${houseObject.name} has been picked as your house! Use the button above if you would like to join this house. Joining a house that you are not currently in will erase all previous scores and points scored for other houses.`;
      this.confirmButton = document.createElement('button')
      this.confirmButton.innerHTML = "Change Houses"
      this.confirmButton.id = 'Verify'
      this.confirmButton.classList.add("btn")
      this.confirmButton.classList.add("btn-outline-primary")
      this.confirmButton.style.position = "absolute";

      this.confirmButton.style.right = "100px";

      this.confirmButton.addEventListener("click", this.addHouseToUser)
      this.resultSlide.appendChild(this.confirmButton)
    }
    this.quizElement.appendChild(this.resultSlide)
  })
  }

  renderHouseResults = () =>{
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

   this.chosenHouse = this.calculateHouseResults()
    this.showWarningAboutChangingHouse()
    }

    addHouseToUser = () => {
      this.confirmButton.remove()
      game.user.removeScores()
      this.resultsContainer.innerHTML = ""
      
      api.patchUserHouse(game.user.id, this.chosenHouse)
      .then(function(userObject){
       let userUpdated = new User(userObject)
        game.setUser(userUpdated)
        LoginDisplay.resetForm()
        LoginDisplay.login(game.user)
        LeaderboardDisplay.createLDisplay()
    })
    }

  


calculateHouseResults = () =>{
     let largestNumber = Math.max(this.gryffindorCount, this.slytherinCount, this.hufflepuffCount, this.ravenclawCount)
      let house = []
      if (this.gryffindorCount === largestNumber){ house.push(2)}
      if (this.slytherinCount === largestNumber){ house.push(3)}
      if (this.ravenclawCount === largestNumber){ house.push(4)}
      if (this.hufflepuffCount === largestNumber){ house.push(5)}
      if (house.length === 1){

        return house[0]
      }
      else {
        return house[Math.floor(Math.random()*house.length)]
      }
      }

    
}
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
            this.renderHouseResults
        }
    }

    renderResults = () => {
    const answersOnPage = document.getElementsByClassName('answers')
    this.questions.forEach( (currentQuestion, questionIndex) => {
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
    if (this.resultsContainer.attributes[1].value === "none" || this.resultsContainer.attributes[1].value === 1){
      console.log("no need to save result")
    }
    else{
     let userNumber = resultsContainer.attributes[1].value
     addScoreToUser(userNumber, numberCorrect)
    }
  }
  
}
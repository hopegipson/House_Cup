class GameButtons {
    constructor(){
    this.buttonsContainer = document.getElementById('buttonsContainer')
    this.triviaBtn = document.createElement('button')
    this.triviaBtn.setAttribute('quiz_id', 1); 
    this.triviaBtn.classList.add('btn')
    this.triviaBtn.classList.add('btn-outline-danger')
    this.triviaBtn.innerHTML = "Trivia Challenge"
    this.triviaBtn.id = 'trivia'
    this.triviaBtn.addEventListener("click", this.triviaButton)
    this.sortingBtn = document.createElement('button')
    this.sortingBtn.setAttribute('quiz_id', 2); 
    this.sortingBtn.classList.add('btn')
    this.sortingBtn.classList.add('btn-outline-danger')
    this.sortingBtn.innerHTML = "Sorting Hat"
    this.sortingBtn.id = 'sorting'
    this.sortingBtn.addEventListener("click", this.sortingButton)
    let divider = document.createElement('div')
    divider.classList.add('divider')
    this.buttonsContainer.append(this.triviaBtn)
    this.buttonsContainer.append(this.sortingBtn)
    this.buttonsContainer.appendChild(divider)
    this.explanation = document.getElementById('explanation')
  }

  triviaButton = (event) => {
    this.explanation.innerHTML = "This trivia game asks a series of questions about the Harry Potter franchise. Consider this your O.W.L.s. You will receive 5 points for your house if you answer 80% correct, and you will receive 10 points if you answer 100% correct."

    let quizNamed = event.target.attributes.quiz_id.value
    GameButtons.resetQuizSpace()
    this.renderQuiz(quizNamed)
    let selectedTriv = document.getElementById("trivia");
    selectedTriv.innerHTML = "Restart Trivia"
    this.resetSortingButton()
  }
  
  sortingButton = (event) =>{
    this.explanation.innerHTML = "You will be asked a series of questions to determine if you are best suited for Hufflepuff, Gryffindor, Slytherin or Ravenclaw. If you already have a house and submit for sorting again, all points and scores you have earned for your old house will be deleted as you can no longer be counted in that house's point total."

    let quizNamed = event.target.attributes.quiz_id.value
    GameButtons.resetQuizSpace()
    this.renderQuiz(quizNamed)
    let selectedSort = document.getElementById("sorting");
    selectedSort.innerHTML = "Restart Sorting"
    this.resetTriviaButton()
  }

  static resetQuizSpace = () => {
    let quizContainer = document.getElementById('contain')
    let resultsContainer = document.getElementById('results')
    quizContainer.innerHTML = ""
    resultsContainer.innerHTML = ""
    let divone = document.createElement('div')
    divone.classList.add('quiz-container');
    let divquiz = document.createElement('div')
    divquiz.setAttribute('id', 'quiz')
    divone.appendChild(divquiz)
    quizContainer.appendChild(divone)
  }

  resetTriviaButton =() =>{
    this.triviaBtn.innerHTML = "Trivia Challenge"
   }
   
    resetSortingButton =() =>{
     this.sortingBtn.innerHTML = "Sorting Hat"
   }

    renderQuiz(quizName){  
      api.getQuiz(quizName).then(function(quiz){new Quiz(quiz)})
      }     

}


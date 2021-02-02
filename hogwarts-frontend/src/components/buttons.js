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
  }

  triviaButton = (event) => {
    let quizNamed = event.target.attributes.quiz_id.value
    this.resetQuizSpace()
    this.renderQuiz(quizNamed)
    let selectedTriv = document.getElementById("trivia");
    selectedTriv.innerHTML = "Restart Trivia"
    this.resetSortingButton()
  }
  
  sortingButton = (event) =>{
    let quizNamed = event.target.attributes.quiz_id.value
    this.resetQuizSpace()
    this.renderQuiz(quizNamed)
    let selectedSort = document.getElementById("sorting");
    selectedSort.innerHTML = "Restart Sorting"
    this.resetTriviaButton()
  }
  resetQuizSpace = () => {
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


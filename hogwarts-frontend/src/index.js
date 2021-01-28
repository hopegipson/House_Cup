
const BASE_URL = "http://localhost:3000"
const HOUSES_URL = `${BASE_URL}/houses`
const QUIZZES_URL = `${BASE_URL}/quizzes`
const main = document.querySelector('main')
const quizContainer = document.getElementById('quiz')
const resultsContainer = document.getElementById('results')
const submitButton = document.getElementById('submit')


function fetchHouses() {
    fetch(HOUSES_URL)
     .then(resp => resp.json())
     .then(json => renderHouses(json));
 }

 function fetchQuizzes(){
     fetch(QUIZZES_URL)
     .then(resp => resp.json())
     .then(json => renderQuizzes(json));
 }

 function renderHouses(houses) {
    const left = document.getElementsByClassName('left')[0]

    houses.forEach(house => {
      const div = document.createElement('div')
     div.classList.add('card');
     div.style.backgroundImage= `url(${house.image})`
     div.style.borderColor = "black"
     let p = document.createElement('p')
     p.innerHTML = house.name
     p.setAttribute('house-id' , house.id); 
     let table = document.createElement('table')
     table.classList.add("table-hover")

     houseUser = house.users  
     //let headersArray = ["User", "Poinst Scored For House"]
    // createHeader(table, 2, headersArray)
     for (user of houseUser) {
        let tr = document.createElement('tr')
         let th = document.createElement('th')
         th.scope= ('col')
         th.innerHTML = user.username
         let th2 = document.createElement('th')
         th2.scope= ('col')
         th2.innerHTML = "points"
         tr.appendChild(th)
         tr.appendChild(th2)
         let th3 = document.createElement('th')
         th3.scope= ('col')
         tr.appendChild(th3)

        table.appendChild(tr)
     }    


    div.appendChild(p)
     div.appendChild(table)
    left.appendChild(div)
    })
  }

function createHeader(table, columns, array){
    let tr = document.createElement('tr')
    for (var i = 0; i < columns; i++){
        let th = document.createElement('th')
        th.scope= ('col')
        th.innerHTML = array[i]
        tr.appendChild(th)}
    table.appendChild(tr)
  }

function renderQuizzes(quizzes
    ){  const output = [];
       quizSelected = quizzes.find(function(e) { return e.name === "Hogwarts Trivia Challenge"})
        selectQuestions = (quizSelected.questions)

        selectQuestions.forEach(
          (currentQuestion, questionIndex) => {
           let answers = document.createElement('div')
           answers.classList.add('answers');
           let questions = document.createElement('div')
           questions.classList.add('questions');
            for(letter in currentQuestion.answers){
              let label = document.createElement('label')
              let input = document.createElement('input')
              input.setAttribute('type', 'radio')
              input.setAttribute('name', `question${questionIndex}`)
              input.setAttribute('value', `${letter}`)
              label.appendChild(input)
              label.innerHTML += `${letter}: ${currentQuestion.answers[letter]}`
              answers.appendChild(label)
            }
          questions.innerHTML = `${currentQuestion.question}`
          //questions.appendChild(answers)
          
          const quizContainer = document.getElementById('quiz');

           quizContainer.appendChild(questions)
            quizContainer.appendChild(answers)

          })
          let quizContainer = document.getElementById('quiz');
          let submitBtn = document.createElement('button')
          submitBtn.classList.add('submitQuiz');
          submitBtn.setAttribute('quiz-id' , quizSelected.id); 
          submitBtn.innerHTML = "Submit Quiz"
          submitBtn.addEventListener('click', resultQuiz)
          quizContainer.append(submitBtn)
          //const submitButton = document.getElementById('submit');
       // submitButton.addEventListener('click', showResults)
      }     


function renderResults(quiz){
  const quizContainer = document.getElementById('quiz');
  const answers = document.getElementsByClassName('answers')
  let numberCorrect = 0;
  quiz.questions.forEach( (currentQuestion, questionIndex) => {

    const answerI = answers[questionIndex];

    let userAnswer = 0
    for (var i = 0, length = answerI.childElementCount; i < length; i++) {
      if (answerI.children[i].children[0].checked) {
       userAnswer = (answerI.children[i].children[0].value);
      }
      else if (answerI.children[i].children[0].checked == false){
        answerI.children[i].children[0].disabled = true
      }
    }

    if(userAnswer === currentQuestion.correct_answer){
      numberCorrect++;
      answers[questionIndex].style.color = 'lightgreen';
    }
    else{
      answers[questionIndex].style.color = 'red';
    }
  });
  const resultsContainer = document.getElementById('results')
  resultsContainer.innerHTML = `${numberCorrect} out of ${quiz.questions.length}`;
}



function resultQuiz(event) {
  let valueQ = event.target.attributes[1].value
  fetch(`${QUIZZES_URL}/${valueQ}`)
  .then(resp => resp.json())
  .then(json => renderResults(json));
}




  document.addEventListener("DOMContentLoaded", () => {
    fetchHouses()
    fetchQuizzes()
  });
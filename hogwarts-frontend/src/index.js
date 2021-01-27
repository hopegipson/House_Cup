console.log("...testing")
const BASE_URL = "http://localhost:3000"
const HOUSES_URL = `${BASE_URL}/houses`
const QUIZZES_URL = `${BASE_URL}/quizzes`

const main = document.querySelector('main')
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

//fetch(`${BACKEND_URL}/test`)
//  .then(response => response.json())
//  .then(parsedResponse => console.log(parsedResponse));

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
    console.log(p)
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
        quizzes.forEach(quiz => {
            console.log(quiz) 
        })

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
      }     


function showResults(){}




  document.addEventListener("DOMContentLoaded", () => {
    fetchHouses()
    fetchQuizzes()
  });
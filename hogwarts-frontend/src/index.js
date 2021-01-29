
const BASE_URL = "http://localhost:3000"
const HOUSES_URL = `${BASE_URL}/houses`
const QUIZZES_URL = `${BASE_URL}/quizzes`
const main = document.querySelector('main')
const quizElement = document.getElementById('quiz')
const resultsContainer = document.getElementById('results')
let currentSlide = 0;

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
      let div = document.createElement('div')
     div.classList.add('card');
     div.style.backgroundImage= `url(${house.image})`
     div.style.borderColor = "black"
     let p = document.createElement('p')
     p.innerHTML = house.name
     p.setAttribute('house-id' , house.id); 
     let table = document.createElement('table')
     table.classList.add("table-hover")

     houseUser = house.users  
     let headersArray = ["User", "Poinst Scored For House"]
    createHeader(table, 2, headersArray)
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
              answers.appendChild(document.createElement("br"));

            }
          questions.innerHTML = `${currentQuestion.question}`
          
          const quizElement = document.getElementById('quiz');
          let slide = document.createElement('div')
          slide.classList.add('slide');

          slide.appendChild(questions)
          slide.appendChild(answers)
          quizElement.append(slide)
          })

        
          let quizElement = document.getElementById('quiz');
          createButtons(quizSelected.id)
          
          const slides = document.querySelectorAll(".slide");

          showSlide(currentSlide, slides);

      
      } 
      
  function createButtons(quizID){
    let prevBtn = document.createElement('button')
    prevBtn.innerHTML = "Previous Question"
    prevBtn.id = 'previous'
    prevBtn.addEventListener("click", showPreviousSlide)

    let nextBtn = document.createElement('button')
    nextBtn.innerHTML = "Next Question"
    nextBtn.id = 'next'
    nextBtn.addEventListener('click', showNextSlide)

    let submitBtn = document.createElement('button')
    submitBtn.classList.add('submitQuiz');
    submitBtn.setAttribute('quiz-id' , quizID); 
    //submitBtn.setAttribute('quiz-id' , quizSelected.id); 
    submitBtn.innerHTML = "Submit Quiz"
    submitBtn.id = 'submit'
    submitBtn.addEventListener("click", resultQuiz)
    const quizContainer = document.getElementById('contain')
    quizContainer.append(prevBtn)
    quizContainer.append(nextBtn)
    quizContainer.append(submitBtn)

  }


function renderResults(quiz){
  const quizElement = document.getElementById('quiz');
  const answers = document.getElementsByClassName('answers')
  let numberCorrect = 0;
  quiz.questions.forEach( (currentQuestion, questionIndex) => {

    const answerI = answers[questionIndex];

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
  console.log(event.target.attributes)
  let valueQ = event.target.attributes[1].value
  fetch(`${QUIZZES_URL}/${valueQ}`)
  .then(resp => resp.json())
  .then(json => renderResults(json));
}

function showSlide(n, slideholder) {
  
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const submitButton = document.getElementById('submit')

  previousButton.myParam = slideholder
  nextButton.myParam = slideholder

  slideholder[currentSlide].classList.remove('slide-activated');
  console.log(n)
  slideholder[n].classList.add('slide-activated');
  currentSlide = n;
  if(currentSlide === 0){
    previousButton.style.display = 'none';
  }
  else{
    previousButton.style.display = 'inline-block';
  }
  if(currentSlide === slideholder.length-1){
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  }
  else{
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
}

function showNextSlide(event) {
  let slidepassed = event.target.myParam
  showSlide(currentSlide + 1, slidepassed);
}

function showPreviousSlide(event) {
  let slidepassed = event.target.myParam
  showSlide(currentSlide - 1, slidepassed);
}


  //document.addEventListener("DOMContentLoaded", () => {
    fetchHouses()
    fetchQuizzes()
 // });
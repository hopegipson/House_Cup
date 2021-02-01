
  document.addEventListener("DOMContentLoaded", () => {

const BASE_URL = "http://localhost:3000"
const HOUSES_URL = `${BASE_URL}/houses`
const QUIZZES_URL = `${BASE_URL}/quizzes`
const USERS_URL = `${BASE_URL}/users`
const left = document.getElementsByClassName('left')[0]
const buttonsContainer = document.getElementById('buttonsContainer')
const login = document.getElementById('login-form')
const usernameField = document.getElementById('username-field')
const patronusField = document.getElementById('patronus-field')
const quizContainer = document.getElementById('contain')

let currentSlide = 0;

transFormtoLoggedOut()
fetchHouses()
createBasicQuizButtons()
renderUserOrLogin()

//LEFT COLUMN

function fetchHouses() {
  fetch(HOUSES_URL)
   .then(resp => resp.json())
   .then(json => renderHouses(json));
}

function renderHouses(houses) {
 houses1 = houses.shift()
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



  //CENTER COLUMN

  function fetchQuizzes(quizName){
    fetch(QUIZZES_URL)
    .then(resp => resp.json())
    .then(json => renderQuizzes(json, quizName));
}

function renderQuizzes(quizzes, quizName
    ){  const output = [];
       quizSelected = quizzes.find(function(e) { return e.name === quizName})
        selectQuestions = (quizSelected.questions)
        selectQuestions.forEach((currentQuestion, questionIndex) => {
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
          let quizElement = document.getElementById('quiz');
          let slide = document.createElement('div')
          slide.classList.add('slide');
          slide.appendChild(questions)
          slide.appendChild(answers)
          quizElement.append(slide)
          })
          createButtons(quizSelected.id)
          const slides = document.querySelectorAll(".slide");
          showSlide(0, slides);
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
    submitBtn.innerHTML = "Submit Quiz"
    submitBtn.id = 'submit'
    submitBtn.addEventListener("click", resultQuiz)
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
  if (resultsContainer.attributes[1].value === "none" || resultsContainer.attributes[1].value === 1){
    console.log("no need to save result")
  }
  else{
   let userNumber = resultsContainer.attributes[1].value
   addScoreToUser(userNumber, numberCorrect)
  }
}

function updateDomWithResults(userObject){
  let highScoreButton = document.getElementById('high_score')
  highScoreButton.innerHTML = `User High Score: ${userObject.highest_score}`
  let pointsUserCard = document.getElementById('pointsUserCard')
  pointsUserCard.innerHTML = `${userObject.house_points} points earned for the House Cup.`
  let listItemHighScore = document.getElementById('listItemHighScore')
  listItemHighScore.innerHTML = `Highest Score: ${userObject.highest_score}`
  
}



function addScoreToUser(user, score){
  fetch(`${USERS_URL}/${user}`, {
    method: 'PATCH',
   headers: {'Content-Type': 'application/json',
      'Accepts': 'application/json'},
    body: JSON.stringify({user_info_score: {
   scores: score
    }
  })
  })
  .then(res => res.json())
  .then(function(user){
  updateDomWithResults(user)  
})

  }



function renderHouseResults(quiz){
  const quizElement = document.getElementById('quiz');
  const answers = document.getElementsByClassName('answers')
  let gryffindorCount = 0;
  let slytherinCount = 0;
  let hufflepuffCount = 0;
  let ravenclawCount = 0;

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

    if(userAnswer === currentQuestion.gryffindor_answer){
      gryffindorCount++;
    }
    else if (userAnswer === currentQuestion.slytherin_answer){
      slytherinCount++;
    }
    else if (userAnswer === currentQuestion.hufflepuff_answer){
      hufflepuffCount++;
    }
    else if (userAnswer === currentQuestion.ravenclaw_answer){
      ravenclawCount++;
    }
  });
 let chosenHouse = calculateHouseResults(gryffindorCount, slytherinCount, hufflepuffCount, ravenclawCount)
 let resultsContainer = document.getElementById('results')
 let userid = resultsContainer.attributes[1].value

    if (resultsContainer.attributes[1].value === "none"){
      console.log("no need to save result")
    }
    else{
   addHouseToUser(userid, chosenHouse)
    }

  //resultsContainer.innerHTML = `${chosenHouse} is your new House! ${chosenHouse.house_information}`;
}

function addHouseToUser(user, house){
  return fetch(`${USERS_URL}/${user}`, {
    method: 'PATCH',
   headers: {'Content-Type': 'application/json',
      'Accepts': 'application/json'},
    body: JSON.stringify({
      user_info_score: {
   house_name: house
    }
  })
})
.then(res => res.json())
.then(function(user){
  appendDOMWithChosenHouse(user)  
})

  //let resultsContainer = document.getElementById('results')
  //let userid = resultsContainer.attributes[1].value

}

  function appendDOMWithChosenHouse(userObject){
  
  
    let resultsContainer = document.getElementById('results')
    resultsContainer.innerHTML = `${userObject.house.name} is your new House! ${userObject.house.house_information}`;
    let cardHouseName = document.getElementById('cardHouseName')
    cardHouseName.innerHTML = `${userObject.house.name}`
    cardHouseName.color = userObject.house.primary_color
  
  }

function calculateHouseResults(gryffindor, slytherin, hufflepuff, ravenclaw){
  largestNumber = Math.max(gryffindor, slytherin, hufflepuff, ravenclaw)
  let house = []
  if (gryffindor == largestNumber){ house.push("Gryffindor")}
  if (slytherin == largestNumber){ house.push("Slytherin")}
  if (ravenclaw == largestNumber){ house.push("Ravenclaw")}
  if (hufflepuff == largestNumber){ house.push("Hufflepuff")}
  console.log(house)
  if (house.length === 1){
    return house[0]
  }
  else {
    return house[Math.floor(Math.random()*house.length)]
  }
  }






function resultQuiz(event) {
  console.log(event.target.attributes[1])
  let valueQ = event.target.attributes[1].value
  if (valueQ == 1){
  fetch(`${QUIZZES_URL}/${valueQ}`)
  .then(resp => resp.json())
  .then(json => renderResults(json));}
  else if (valueQ == 2){
    fetch(`${QUIZZES_URL}/${valueQ}`)
    .then(resp => resp.json())
    .then(json => renderHouseResults(json));
  }
}

function showSlide(n, slideholder) {
  
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const submitButton = document.getElementById('submit')

  previousButton.myParam = slideholder
  nextButton.myParam = slideholder

  slideholder[currentSlide].classList.remove('slide-activated');
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

function triviaButton(event){
  let quizNamed = event.target.attributes.quiz_name.value
  resetQuizSpace()
  fetchQuizzes(quizNamed)
  let selectedTriv = document.getElementById("trivia");
  selectedTriv.innerHTML = "Restart Trivia"
  resetSortingButton()
}

function sortingButton(event){
  let quizNamed = event.target.attributes.quiz_name.value
  resetQuizSpace()
  fetchQuizzes(quizNamed)
  let selectedSort = document.getElementById("sorting");
  selectedSort.innerHTML = "Restart Sorting"
  resetTriviaButton()
}

function resetQuizSpace(){
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




  console.log(quizContainer)
}

function resetTriviaButton(){
 let selectedTriv = document.getElementById("trivia");
 selectedTriv.innerHTML = "Trivia Challenge"
}

function resetSortingButton(){
  let selectedSort = document.getElementById("sorting");
  selectedSort.innerHTML = "Sorting Hat"
}

function createBasicQuizButtons(){
  let triviaBtn = document.createElement('button')
  triviaBtn.setAttribute('quiz_name', "Hogwarts Trivia Challenge"); 
  triviaBtn.classList.add('btn')
  triviaBtn.classList.add('btn-outline-danger')
  triviaBtn.innerHTML = "Trivia Challenge"
  triviaBtn.id = 'trivia'
  triviaBtn.addEventListener("click", triviaButton)
  let sortingBtn = document.createElement('button')
  sortingBtn.setAttribute('quiz_name', "Hogwarts Sorting Hat"); 
  sortingBtn.classList.add('btn')
  sortingBtn.classList.add('btn-outline-danger')
  sortingBtn.innerHTML = "Sorting Hat"
  sortingBtn.id = 'sorting'
  sortingBtn.addEventListener("click", sortingButton)
  let divider = document.createElement('div')
  divider.classList.add('divider')
  buttonsContainer.append(triviaBtn)
  buttonsContainer.append(sortingBtn)
  buttonsContainer.appendChild(divider)
}


//RIGHT COLUMN

function createUser(username, patronus) {
  return fetch(USERS_URL, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_info: {
        user_username: username,
        user_patronus: patronus
      }
    }
    )
  })
  .then(res => res.json())
  .then(function(user){
    console.log(user)
    transformLoginSpot(user)
  })
  .catch(function(error) {
    console.log(error)
})
}

function lookForUser(users, username, patronus){
  let selectedUsers = []
  users.map(function(user){
    if (user.username === username){selectedUsers.push(user)} 
  })

  if (selectedUsers.length === 0){
    createUser(username, patronus)
  }
  else{
   let selectedObject = selectedUsers.find(function(s){return s.patronus === patronus})
      if (selectedObject){
        transformLoginSpot(selectedObject)
      }
      else{
        let errors = document.getElementById('errors')
        errors.innerHTML = "Your patronus is incorrect. Make a new user with a new username or verify patronus."
        errors.style.color = 'red'

      }
  }
}

function transformLoginSpot(userObject){
  const login = document.getElementById('login-form') 
  const rules = document.getElementById('rules')
  const formspot = document.getElementById('formspot')
  console.log(formspot)
  login.style.display = "none"
  rules.style.display = "none"
  let div = document.createElement('div')
  div.classList.add('card')
  div.classList.add('mb-3')
  let h3 = document.createElement('h3')
  h3.classList.add('card-header')
  h3.innerHTML = `Welcome back ${userObject.username}`

  let div2 = document.createElement('div')
  div2.classList.add('card-body')
  let h5 = document.createElement('h5')
  h5.classList.add('card-title')
  h5.setAttribute('id', 'pointsUserCard')
  h5.innerHTML = `${userObject.house_points} points earned for the House Cup.`
  let h6 = document.createElement('h6')
  h6.classList.add('card-subtitle')
  h6.setAttribute('id', 'cardHouseName')
  h6.innerHTML = `${userObject.house.name}`
  h6.style.color = userObject.house.primary_color
  div2.appendChild(h5)
  div2.appendChild(h6)

  let image = document.createElement('img')
  image.setAttribute('width', '350px')
  image.setAttribute('fill', '#868e96')
  image.setAttribute('id', 'houseImage')
  image.src= `${userObject.house.image}`
 
  let div3 = document.createElement('div')
  div3.classList.add('card-body')
  
  let p = document.createElement('p')
  p.classList.add('card-text')
  p.classList.add('styledp')
  p.innerHTML = `${userObject.house.small_summary}`
 
 

  let ul1 = document.createElement('ul')
  ul1.classList.add('list-group')
  ul1.classList.add('list-group-flush')
  if (userObject.house != 1){
  let li1 = document.createElement('li')
  li1.classList.add('list-group-item')
  li1.innerHTML = `House Traits: ${userObject.house.traits} `
  ul1.appendChild(li1)
  let li2 = document.createElement('li')
  li2.classList.add('list-group-item')
  li2.innerHTML = `Mascot: ${userObject.house.mascot} `
  ul1.appendChild(li2)
  let li3 = document.createElement('li')
  li3.classList.add('list-group-item')
  li3.innerHTML = `Element: ${userObject.house.element} `
  ul1.appendChild(li3)
  }
  let li4 = document.createElement('li')
  li4.classList.add('list-group-item')
  li4.innerHTML = `Patronus: ${userObject.patronus}`

  let li5 = document.createElement('li')
  li5.classList.add('list-group-item')
  li5.setAttribute('id', 'listItemHighScore')
  li5.innerHTML = `Highest Score: ${userObject.highest_score}`
  ul1.appendChild(li4)
  ul1.appendChild(li5)
  div3.appendChild(p)
  div3.appendChild(ul1)
  div.appendChild(h3)
  div.appendChild(div2)
  div.appendChild(image)
  div.appendChild(div3)
  formspot.appendChild(div)
//change something on the page to store userID in the quiz spot

let highScoreBtn = document.createElement('button')
highScoreBtn.classList.add('btn')
highScoreBtn.classList.add('btn-outline-info')
highScoreBtn.innerHTML = `User High Score: ${userObject.highest_score} `
highScoreBtn.id = 'high_score'
const buttonsContainer =  document.getElementById('buttonsContainer');
buttonsContainer.appendChild(highScoreBtn)
const resultsContainer = document.getElementById('results')
resultsContainer.setAttribute('userid', userObject.id)

}

function transFormtoLoggedOut(){
  //need to reverse this
  //bring back the form
  //also need to make it happen so if your patronus is wrong you can't login
  //resultsContainer.setAttribute('userid', userObject.id)  set to 1

}

function renderUserOrLogin(){
  login.addEventListener("submit", function(event){
    function checkToSeeIfUserExists(){
      let userUsername = usernameField.value
      let userPatronus = patronusField.value
      fetch(USERS_URL)
     .then(resp => resp.json())
     .then(json => lookForUser(json, userUsername, userPatronus)
     )
  }    
  event.preventDefault()
  checkToSeeIfUserExists()
  })
}

});


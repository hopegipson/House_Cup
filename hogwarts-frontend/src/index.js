
  document.addEventListener("DOMContentLoaded", () => {
    transFormtoLoggedOut()
    fetchHouses()
    createBasicQuizButtons()
    renderUserOrLogin()
 });

const BASE_URL = "http://localhost:3000"
const HOUSES_URL = `${BASE_URL}/houses`
const QUIZZES_URL = `${BASE_URL}/quizzes`
const USERS_URL = `${BASE_URL}/users`
const main = document.querySelector('main')
const quizElement = document.getElementById('quiz')
const resultsContainer = document.getElementById('results')
const quizContainer = document.getElementById('contain')
//const buttonsContainer = document.getElementById('buttonsContainer')

let currentSlide = 0;

//LEFT COLUMN

function fetchHouses() {
    fetch(HOUSES_URL)
     .then(resp => resp.json())
     .then(json => renderHouses(json));
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

          //showSlide(currentSlide, slides);
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
  if (resultsContainer.attributes[1].value === "none"){
    console.log("no need to save result")
  }
  else{
    //will need to send a patch request to some sort of user patch scores

    console.log(numberCorrect)
  }
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
 console.log(chosenHouse)
  const resultsContainer = document.getElementById('results')
  resultsContainer.innerHTML = `${chosenHouse} is your new House! Should show gryffindor.someinformation about it`;
}

function calculateHouseResults(gryffindor, slytherin, hufflepuff, ravenclaw){
 largestNumber = Math.max(gryffindor, slytherin, hufflepuff, ravenclaw)
 let house = []
 if (gryffindor == largestNumber){ house.push("Gryffindor")}
 else if (slytherin == largestNumber){ house.push("Slytherin")}
 else if (ravenclaw == largestNumber){ house.push("Ravenclaw")}
 else if (hufflepuff == largestNumber){ house.push("Hufflepuff")}

 if (house.length == 1){
   return house[0]
 }
 else if(house.length == 2){
   console.log("tiebreaker not yet created")
 }



 console.log(largestNumber)
}



function resultQuiz(event) {
  console.log(event.target.attributes)
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
 
  const buttonsContainer =  document.getElementById('buttonsContainer');
  let divider = document.createElement('div')
  divider.classList.add('divider')
  buttonsContainer.append(triviaBtn)
  buttonsContainer.appendChild(divider)
  buttonsContainer.append(sortingBtn)
  buttonsContainer.appendChild(divider)
  //buttonsContainer.append(highScoreBtn)

}


//RIGHT COLUMN

function fetchUsers() {
  fetch(USERS_URL)
   .then(resp => resp.json())
  // .then(json => checkToSeeIfUserExists(json));
}


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
    //after user is created you'll want to make them current user and add their info to the DOM
    console.log(user)
  })
}

function lookForUser(users, username, patronus){
  console.log(users)
  console.log(username)
  console.log(users[0].username)
  console.log(users[0].patronus === patronus)
  console.log(users[0].username === username)

  const selectedObject = users.find( function(s) { return s.username === username })
  if (selectedObject){
      transformLoginSpot(selectedObject)
    //selected object should now be a full JSON object hash
    //now you can post this user's information you now have to the DOM
  }
  else{
    createUser(username, patronus)
  }
  console.log(selectedObject)
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
  h5.innerHTML = `${userObject.house_points} points earned for the House Cup.`
  let h6 = document.createElement('h6')
  h6.classList.add('card-subtitle')
//  if (userObject.house){
 h6.innerHTML = `${userObject.house.name}`
 h6.style.color = userObject.house.primary_color
 // }
  //else{ h6.innerHTML = "Not sorted into a house yet"}
  div2.appendChild(h5)
  div2.appendChild(h6)

  let image = document.createElement('img')
  image.setAttribute('width', '350px')
  image.setAttribute('fill', '#868e96')
  image.src = 'https://img2.cgtrader.com/items/2228955/0404dd9a15/hogwarts-crest-3d-model-obj-3ds-fbx-c4d-stl.jpg'

  let div3 = document.createElement('div')
  div3.classList.add('card-body')
  let p = document.createElement('p')
  p.classList.add('card-text')
  p.innerHTML = "Will be where small house summary will go"
  let ul1 = document.createElement('ul')
  ul1.classList.add('list-group')
  ul1.classList.add('list-group-flush')
  let li1 = document.createElement('li')
  li1.classList.add('list-group-item')
  li1.innerHTML = `House Traits: ${userObject.house.traits} `
  let li2 = document.createElement('li')
  li2.classList.add('list-group-item')
  li2.innerHTML = `Patronus: ${userObject.patronus}`
  let li3 = document.createElement('li')
  li3.classList.add('list-group-item')
  li3.innerHTML = `Patronus Traits`
  let li4 = document.createElement('li')
  li4.classList.add('list-group-item')
  li4.innerHTML = `Highest Score`
  ul1.appendChild(li1)
  ul1.appendChild(li2)
  ul1.appendChild(li3)
  ul1.appendChild(li4)
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
highScoreBtn.innerHTML = "User High Score: "
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
  //resultsContainer.setAttribute('userid', userObject.id)

}

function renderUserOrLogin(){
  const login = document.getElementById('login-form')
  const usernameField = document.getElementById('username-field')
  const patronusField = document.getElementById('patronus-field')
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



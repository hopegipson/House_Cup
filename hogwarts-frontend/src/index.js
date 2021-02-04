
const api = new APIAdapter
const game = new Game


  document.addEventListener("DOMContentLoaded", () => {
    
const BASE_URL = "http://localhost:3000"
const HOUSES_URL = `${BASE_URL}/houses`
const USERS_URL = `${BASE_URL}/users`
const login = document.getElementById('login-form')
const usernameField = document.getElementById('username-field')
const patronusField = document.getElementById('patronus-field')

LeaderboardDisplay.createLDisplay.call()
buttons = new GameButtons()
renderUserOrLogin()

//LEFT COLUMN

//CENTER COLUMN

//RIGHT COLUMN

function createUser(username, patronus) {
  api.postUser(username, patronus)
  .then(function(user){
    console.log(user)
    let user1 = new User(user)
    game.setUser(user1)
    user1.login()
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
        const user = new User(selectedObject)
        game.setUser(user)
        user.login()
        console.log(user)

      }
      else{
        let errors = document.getElementById('errors')
        errors.innerHTML = "Your patronus is incorrect. Make a new user with a new username or verify patronus."
        errors.style.color = 'red'

      }
  }
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


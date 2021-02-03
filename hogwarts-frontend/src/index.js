
const api = new APIAdapter
const game = new Game
  document.addEventListener("DOMContentLoaded", () => {

const BASE_URL = "http://localhost:3000"
const HOUSES_URL = `${BASE_URL}/houses`
const USERS_URL = `${BASE_URL}/users`
const left = document.getElementsByClassName('left')[0]
//const buttonsContainer = document.getElementById('buttonsContainer')
const login = document.getElementById('login-form')
const usernameField = document.getElementById('username-field')
const patronusField = document.getElementById('patronus-field')


transFormtoLoggedOut()
fetchHouses()
buttons = new GameButtons()
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


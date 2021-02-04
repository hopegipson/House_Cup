class LoginDisplay {
    static createLoginDisplay = () => {
        const loginDisplay = new LoginDisplay
        loginDisplay.errors = document.getElementById('errors')
        loginDisplay.login = document.getElementById('login-form')
        loginDisplay.usernameField = document.getElementById('username-field')
        loginDisplay.patronusField = document.getElementById('patronus-field')
        loginDisplay.renderUserOrLogin()
    }

    renderUserOrLogin = () =>{
        this.login.addEventListener("submit", (event) =>{
        event.preventDefault()
        this.checkToSeeIfUserExists()
        })
      }
      
      lookForUser = (users, username, patronus) => {
        let selectedUsers = []
        users.map(function(user){
          if (user.username === username){selectedUsers.push(user)} 
        })
        if (selectedUsers.length === 0){
          this.createUser(username, patronus)
        }
        else{
         let selectedObject = selectedUsers.find(function(s){return s.patronus === patronus})
            if (selectedObject){
              const user = new User(selectedObject)
              game.setUser(user)
              user.login()
            }
            else{
             this.errors.innerHTML = "Your patronus is incorrect. Make a new user with a new username or verify patronus."
              this.errors.style.color = 'red'
            }
        }
          console.log("got here")
      }
   
      checkToSeeIfUserExists = () => {
        let userUsername = this.usernameField.value
        let userPatronus = this.patronusField.value
        api.getUsers().then(json => this.lookForUser(json, userUsername, userPatronus))
        } 

      createUser = (username, patronus) => {
        api.postUser(username, patronus)
        .then(function(user){
          console.log(user)
          let user1 = new User(user)
          game.setUser(user1)
          user1.login()
        })

        }
}
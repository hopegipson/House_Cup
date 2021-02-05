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
              LoginDisplay.login(user)
            }
            else{
             this.errors.innerHTML = "Your patronus is incorrect. Make a new user with a new username or verify patronus."
              this.errors.style.color = 'red'
            }
        }
      }
   
      checkToSeeIfUserExists = () => {
        let userUsername = Helper.makeNameString(this.usernameField.value)
        let userPatronus = this.patronusField.value.toLowerCase() 
        api.getUsers().then(json => this.lookForUser(json, userUsername, userPatronus))
        } 

      createUser = (username, patronus) => {
        api.postUser(username, patronus)
        .then(function(user){
          let user1 = new User(user)
          game.setUser(user1)
          LoginDisplay.login(user1)
        })

        }

    static login = (user) => {
        const breaks = document.getElementById('breaks')
        const login = document.getElementById('login-form') 
        const rules = document.getElementById('rules')
        const formspot = document.getElementById('formspot')
        login.style.display = "none" 
        rules.style.display = "none"
        breaks.style.display = "none"
        let div = document.createElement('div')
        div.style.margin =  "50px"

        div.setAttribute('id', 'division1')
        div.classList.add('card')
        div.classList.add('mb-3')
        let h3 = document.createElement('h3')
        h3.classList.add('card-header')
        h3.innerHTML = `Welcome back ${user.username}`

        let div2 = document.createElement('div')
        div2.classList.add('card-body')
        let h5 = document.createElement('h5')
        h5.classList.add('card-title')
        h5.setAttribute('id', 'pointsUserCard')
        if (user.house.name != "Unsorted"){
        h5.innerHTML = `${user.house_points} points earned for the House Cup.`
        }
        else{
          h5.innerHTML = "Unsorted Users cannot earn points"

        }
        let h6 = document.createElement('h6')
        h6.classList.add('card-subtitle')
        h6.setAttribute('id', 'cardHouseName')
        h6.innerHTML = `${user.house.name}`
        h6.style.color = user.house.primary_color
        div2.appendChild(h5)
        div2.appendChild(h6)

        let image = document.createElement('img')
        image.setAttribute('width', '327px')
        image.setAttribute('fill', '#868e96')
        image.setAttribute('id', 'houseImage')
        image.src= `${user.house.image}`
        
        let div3 = document.createElement('div')
        div3.classList.add('card-body')
        
        let p = document.createElement('p')
        p.classList.add('card-text')
        p.classList.add('styledp')
        p.innerHTML = `${user.house.small_summary}`
        
        let ul1 = document.createElement('ul')
        ul1.classList.add('list-group')
        ul1.classList.add('list-group-flush')


        if (user.house.name != "Unsorted"){
        let li1 = document.createElement('li')
        li1.classList.add('list-group-item')
        li1.innerHTML = `House Traits: ${user.house.traits} `
        ul1.appendChild(li1)
        let li2 = document.createElement('li')
        li2.classList.add('list-group-item')
        li2.innerHTML = `Mascot: ${user.house.mascot} `
        ul1.appendChild(li2)
        let li3 = document.createElement('li')
        li3.classList.add('list-group-item')
        li3.innerHTML = `Element: ${user.house.element} `
        ul1.appendChild(li3)
        let li5 = document.createElement('li')
        li5.classList.add('list-group-item')
        li5.setAttribute('id', 'listItemHighScore')
        li5.innerHTML = `Highest Score: ${user.highest_score}`
        ul1.appendChild(li5)

        let highScoreBtn = document.createElement('button')
        highScoreBtn.classList.add('btn')
        highScoreBtn.classList.add('btn-outline-info')
        highScoreBtn.innerHTML = `User High Score: ${user.highest_score} `
        highScoreBtn.id = 'high_score'
        const buttonsContainer =  document.getElementById('buttonsContainer');
        buttonsContainer.appendChild(highScoreBtn)

        }
        let li4 = document.createElement('li')
        li4.classList.add('list-group-item')
        let patronusCap = Helper.makeNameString(user.patronus)
        li4.innerHTML = `Patronus: ${patronusCap}`

        let logoutBtn = document.createElement('button')
        logoutBtn.classList.add('btn')
        logoutBtn.classList.add('btn-outline-danger')
        logoutBtn.innerHTML = "Logout"
        logoutBtn.id = 'logout'
        logoutBtn.addEventListener("click", LoginDisplay.logout)

       
        ul1.appendChild(li4)
        div3.appendChild(p)
        div3.appendChild(ul1)
        div.appendChild(h3)
        div.appendChild(div2)
        div.appendChild(image)
        div.appendChild(div3)
        div.appendChild(logoutBtn)
        formspot.appendChild(div)
        
    } 

    static resetForm = () => {
        let div1 = document.getElementById("division1")
        div1.remove()
        let highScoreBtn = document.getElementById('high_score')
        if (highScoreBtn != null){
        highScoreBtn.remove()}
      }
  
    static logout = () => {
      let breaks = document.getElementById('breaks')
      let login = document.getElementById('login-form') 
      let rules = document.getElementById('rules')
      let errors = document.getElementById('errors')
  
      LoginDisplay.resetForm()
      GameButtons.resetQuizSpace()

      breaks.style.display = 'block'
  
      login.style.display = 'inline-block'
      errors.innerHTML = ''
      login.reset()
      rules.style.display = 'inline-block'
      game.user = "None"
    }
  
    
        
}
class User {

    constructor(user){
      this.username = user.username
      this.patronus = user.patronus
      this.house = user.house
      this.scores = user.scores
      if (user.scores.length === 0){
        this.highest_score = 0
        this.house_points = 0
      }
      else{
        this.getHighestScore()
      this.getHousePoints()
      }
      this.id = user.id
      
    }

    getHighestScore = () => {
     let numberArray = []
     this.scores.forEach(score => {
      numberArray.push(score.number_correct)
     })
      this.highest_score = Math.max(...numberArray)
    }

    getHousePoints = () => {
      let numberArray = []
      this.scores.forEach(score => {
       numberArray.push(score.house_points)
      })
      this.house_points = [...numberArray].reduce((a, b) => a + b, 0)
    }

    login = () => {
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
        h3.innerHTML = `Welcome back ${this.username}`

        let div2 = document.createElement('div')
        div2.classList.add('card-body')
        let h5 = document.createElement('h5')
        h5.classList.add('card-title')
        h5.setAttribute('id', 'pointsUserCard')
        if (this.house.name != "Unsorted"){
        h5.innerHTML = `${this.house_points} points earned for the House Cup.`
        }
        else{
          h5.innerHTML = "Sorted Users cannot earn points"

        }
        let h6 = document.createElement('h6')
        h6.classList.add('card-subtitle')
        h6.setAttribute('id', 'cardHouseName')
        h6.innerHTML = `${this.house.name}`
        h6.style.color = this.house.primary_color
        div2.appendChild(h5)
        div2.appendChild(h6)

        let image = document.createElement('img')
        image.setAttribute('width', '327px')
        image.setAttribute('fill', '#868e96')
        image.setAttribute('id', 'houseImage')
        image.src= `${this.house.image}`
        
        let div3 = document.createElement('div')
        div3.classList.add('card-body')
        
        let p = document.createElement('p')
        p.classList.add('card-text')
        p.classList.add('styledp')
        p.innerHTML = `${this.house.small_summary}`
        
        let ul1 = document.createElement('ul')
        ul1.classList.add('list-group')
        ul1.classList.add('list-group-flush')


        if (this.house.name != "Unsorted"){
        let li1 = document.createElement('li')
        li1.classList.add('list-group-item')
        li1.innerHTML = `House Traits: ${this.house.traits} `
        ul1.appendChild(li1)
        let li2 = document.createElement('li')
        li2.classList.add('list-group-item')
        li2.innerHTML = `Mascot: ${this.house.mascot} `
        ul1.appendChild(li2)
        let li3 = document.createElement('li')
        li3.classList.add('list-group-item')
        li3.innerHTML = `Element: ${this.house.element} `
        ul1.appendChild(li3)
        let li5 = document.createElement('li')
        li5.classList.add('list-group-item')
        li5.setAttribute('id', 'listItemHighScore')
        li5.innerHTML = `Highest Score: ${this.highest_score}`
        ul1.appendChild(li5)

        let highScoreBtn = document.createElement('button')
        highScoreBtn.classList.add('btn')
        highScoreBtn.classList.add('btn-outline-info')
        highScoreBtn.innerHTML = `User High Score: ${this.highest_score} `
        highScoreBtn.id = 'high_score'
        const buttonsContainer =  document.getElementById('buttonsContainer');
        buttonsContainer.appendChild(highScoreBtn)

        }
        let li4 = document.createElement('li')
        li4.classList.add('list-group-item')
        li4.innerHTML = `Patronus: ${this.patronus}`

        let logoutBtn = document.createElement('button')
        logoutBtn.classList.add('btn')
        logoutBtn.classList.add('btn-outline-danger')
        logoutBtn.innerHTML = "Logout"
        logoutBtn.id = 'logout'
        logoutBtn.addEventListener("click", this.logout)

       
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

    resetForm = () => {
      let div1 = document.getElementById("division1")
      div1.remove()
      let highScoreBtn = document.getElementById('high_score')
      highScoreBtn.remove()
    }

  logout = () => {
    const breaks = document.getElementById('breaks')
    const login = document.getElementById('login-form') 
    const rules = document.getElementById('rules')
    this.resetForm()
    breaks.style.display = 'block'

    login.style.display = 'inline-block'
    rules.style.display = 'inline-block'
    game.user = "None"
  }

  removeScores = () => {
    this.scores.forEach(score =>
      api.deleteScore(score.id)
    )
    this.scores =[]
  }


}
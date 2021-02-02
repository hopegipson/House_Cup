class User {
    constructor(user){
      this.username = user.username
      this.patronus = user.patronus
      this.house = user.house
      this.scores = user.scores
      this.highest_score = user.highest_score
      this.house_points = user.house_points
    }

    login = () => {
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
        h3.innerHTML = `Welcome back ${this.username}`

        let div2 = document.createElement('div')
        div2.classList.add('card-body')
        let h5 = document.createElement('h5')
        h5.classList.add('card-title')
        h5.setAttribute('id', 'pointsUserCard')
        h5.innerHTML = `${this.house_points} points earned for the House Cup.`
        let h6 = document.createElement('h6')
        h6.classList.add('card-subtitle')
        h6.setAttribute('id', 'cardHouseName')
        h6.innerHTML = `${this.house.name}`
        h6.style.color = this.house.primary_color
        div2.appendChild(h5)
        div2.appendChild(h6)

        let image = document.createElement('img')
        image.setAttribute('width', '350px')
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
        }
        let li4 = document.createElement('li')
        li4.classList.add('list-group-item')
        li4.innerHTML = `Patronus: ${this.patronus}`

        let li5 = document.createElement('li')
        li5.classList.add('list-group-item')
        li5.setAttribute('id', 'listItemHighScore')
        li5.innerHTML = `Highest Score: ${this.highest_score}`
        ul1.appendChild(li4)
        ul1.appendChild(li5)
        div3.appendChild(p)
        div3.appendChild(ul1)
        div.appendChild(h3)
        div.appendChild(div2)
        div.appendChild(image)
        div.appendChild(div3)
        formspot.appendChild(div)
        
        let highScoreBtn = document.createElement('button')
        highScoreBtn.classList.add('btn')
        highScoreBtn.classList.add('btn-outline-info')
        highScoreBtn.innerHTML = `User High Score: ${this.highest_score} `
        highScoreBtn.id = 'high_score'
        const buttonsContainer =  document.getElementById('buttonsContainer');
        buttonsContainer.appendChild(highScoreBtn)
    }



}
class HouseLeaderboard {
    constructor(houses, title){
        this.title = title
        this.houses = houses
        this.calculateHouseScores()
   
    }

    calculateHouseScores = () => {
        this.house_points = {}
        this.houses.forEach(house => {
            let points = 0
            house.users.forEach(user => {
                 user.scores.forEach(score => {
                points += score.house_points})
        })
        this.house_points[house.id] = points
    })
    this.sortedPoints = Object.entries(this.house_points).sort((a, b) => b[1]-a[1])
    }

    appendLeaderBoardToDOM = () => {
        this.removeLeaderBoardFromDOM()
        const left = document.getElementById('formspot2')
        let div = document.createElement('div')
        div.style.margin =  "50px"
        div.setAttribute('id', `divisionleaderboard${this.title}`)
        div.classList.add('card')
        div.classList.add('mb-3')
        let h3 = document.createElement('h3')
        h3.classList.add('card-header')
        h3.innerHTML = `${this.title}`
        let ul1 = document.createElement('ul')
        ul1.classList.add('list-group')
        ul1.classList.add('list-group-flush')


        let div3 = document.createElement('div')
        div3.classList.add('card-body')
        let index = 1
        this.sortedPoints.slice(0, 9).forEach(value =>{
        let selectedHouse = (this.houses.find(x => x.id === parseInt(value[0])))
        let li5 = document.createElement('li')
        li5.style.color = selectedHouse.primary_color
        li5.classList.add('list-group-item')
        let br = document.createElement('br')

        let image = document.createElement('img')
        image.setAttribute('width', '20px')
        image.setAttribute('fill', '#868e96')
        image.setAttribute('id', 'houseImage')
        image.src= `${selectedHouse.crest}`
        li5.appendChild(image)
        li5.innerHTML += `       ${selectedHouse.name}: `
        li5.appendChild(br)
        li5.innerHTML += `${value[1]} points earned by ${selectedHouse.users.length} students`
        ul1.appendChild(li5)
        index ++

        })
        div3.appendChild(ul1)
        div.appendChild(h3)
        div.appendChild(div3)
        left.appendChild(div)
    }

    removeLeaderBoardFromDOM = () => {
        let leaderBoardspace = document.getElementById('formspot2')
        leaderBoardspace.innerHTML = ''
        }



  
    

   

}
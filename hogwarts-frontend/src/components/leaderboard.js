class Leaderboard {
    constructor(users, title){
        this.title = title
        this.users = users
        this.calculateUserScores()
    }

    calculateUserScores = () => {
       this.sortedUsers = this.users.sort((a, b) => b.getHousePoints()-a.getHousePoints())
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
        this.sortedUsers.slice(0, 9).forEach(user =>{
        let li5 = document.createElement('li')
        li5.style.color = user.house.primary_color
        li5.classList.add('list-group-item')
        let br = document.createElement('br')

        let image = document.createElement('img')
        image.setAttribute('width', '20px')
        image.setAttribute('fill', '#868e96')
        image.setAttribute('id', 'houseImage')
        image.src= `${user.house.crest}`
        li5.appendChild(image)
        li5.innerHTML += `       ${user.username}: `
        li5.appendChild(br)
        li5.innerHTML += `${user.house_points} points for ${user.house.name}`
        ul1.appendChild(li5)

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


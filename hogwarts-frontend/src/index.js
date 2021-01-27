console.log("...testing")
const BASE_URL = "http://localhost:3000"
const HOUSES_URL = `${BASE_URL}/houses`
const main = document.querySelector('main')

//fetch(`${BACKEND_URL}/test`)
//  .then(response => response.json())
//  .then(parsedResponse => console.log(parsedResponse));

function fetchHouses() {
    fetch(HOUSES_URL)
     .then(resp => resp.json())
     .then(json => renderHouses(json));
 }

 function renderHouses(houses) {
    const left = document.getElementsByClassName('left')[0]

    houses.forEach(house => {
      const div = document.createElement('div')
     div.classList.add('card');
     div.style.backgroundImage= `url(${house.image})`
     div.style.borderColor = "black"
     let p = document.createElement('p')
     p.innerHTML = house.name
     p.setAttribute('house-id' , house.id); 
     let table = document.createElement('table')
     table.classList.add("table-hover")

     houseUser = house.users  
    // let headersArray = ["User", "Poinst Scored For House"]
    // createHeader(table, 2, headersArray)
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
    console.log(p)
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


  document.addEventListener("DOMContentLoaded", () => {
    fetchHouses()
  });
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
     let p = document.createElement('p')
     p.innerHTML = house.name
     p.setAttribute('house-id' , house.id); 
     let table = document.createElement('table')
     table.classList.add("table-hover")
     houseUser = house.users  
     for (user of houseUser) {
        let tr = document.createElement('tr')
         let th = document.createElement('th')
         th.scope= ('col')
         th.innerHTML = user.username
         let th2 = document.createElement('th')
         th2.scope= ('col')
         th2.innerHTML = user.username
         tr.appendChild(th)
         tr.appendChild(th2)


        table.appendChild(tr)
     }    


    div.appendChild(p)
    console.log(p)
     div.appendChild(table)
    left.appendChild(div)
    })
  }

  document.addEventListener("DOMContentLoaded", () => {
    fetchHouses()
  });
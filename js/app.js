/**
 * Global Variables for creating DOM elements 
 * 
*********************************************/
const gallery = document.getElementById('gallery');
console.log(gallery);
const empProfiles = [];
//search markup

const searchDiv = document.querySelector('.search-container');
searchDiv.insertAdjacentHTML('beforeend', `
    <form action="#" method="GET">
        <input type="search" id="search-input"
        class="search-input" placeholder="Search...">
        <input type="submit" value="Search" id="search-submit" class="search-submit">
    </form>
`)

//Variables that hold the URL 
const employees = 'https://randomuser.me/api/?results=12&nat=us';
console.log(employees);

/**
 * Fetch functions
 * 
*/
async function fetchData(url){
    try {
        const results = await fetch(url);
        return await results.json();
    } catch (error) {
        return console.log('Looks like there was a problem', error);
    }
}

//create a fetch function that fetches employees parsing it to json 
fetchData(employees) 
    .then(data => data)
    .then(data => {
        generateProfiles(data.results);
        generateProfileMods(data.results);
        callCard(data.results)
    })

      
/**
 * Helper functions
 * 
*/
function generateProfiles(data) {
    empProfiles.push(data)
    const profile = data.map(data => `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${data.picture.large}" alt="profile picture"> 
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
                <p class="card-text">${data.email}</p>
                <p class="card-text cap">${data.location.city}, ${data.location.state} </p>
            </div>
        </div>`).join('');
    gallery.insertAdjacentHTML('beforeend', profile);
   
}

function generateProfileMods(data) {
    gallery.insertAdjacentHTML('beforeend', `
    <div class="modal-container">
    <div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
   
    </div>
</div> 
    <div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
</div>
    `);
    const modal = document.querySelector('.modal-container');
    modal.style.display = 'none';
    const xBtn = document.querySelector('.modal-close-btn');
    xBtn.addEventListener('click', () => {modal.style.display = 'none'});

    //target the previous and next button 

     const prevBttn = document.querySelector('.modal-prev');
    //create an eventlister for 
    prevBttn.addEventListener('click', () => {

        console.log("previous button clicked");
          
    })
     const nextBttn = document.querySelector('.modal-next');
         nextBttn.addEventListener('click', () => {
             console.log('nxt bttn clicked')
          })

}
// Create update modal function that accepts one parameter, 
//which will be an employee object
function updateMod(emp) {
    const date = new Date (`${emp.dob.date}`);
    const month = date.getMonth() + 1,
        day = date.getDate(),
        year = date.getFullYear();
    const dstr = `${month}/${day}/${year}`; 
    const modalInfo = document.querySelector('.modal-info-container');
    modalInfo.innerHTML = '';
    modalInfo.insertAdjacentHTML('afterbegin', `
        <img class="modal-img" src=${emp.picture.large} alt="profile picture">
        <h3 id="name" class="modal-name cap">${emp.name.first} ${emp.name.first}</h3>
            <p class="modal-text">${emp.email}</p> 
            <p class="modal-text cap">${emp.phone}</p>
        <hr>
            <p class="modal-text">${emp.location.street.number} ${emp.location.street.name} 
            ${emp.location.city} ${emp.location.state}</p>
            <p class="modal-text">Birhday: ${dstr}</p>
    `)
  
}

// function checkStatus(response) {
//     if(response.ok) {
//         return Promise.resolve(response)
//     } else {
//         return Promise.reject(new Error(response.statusText))
//     }
// }

/**
 * Event listeners 
 * 
*/
function callCard(data){
const cards = document.querySelectorAll('.card');
console.log(cards);
//iterate through the cards list
    for(const [i, card ]of cards.entries()) {
        console.log(i, card);

// Add click handlers to cards so that clicking card displays modal and adds employee specific data
        card.addEventListener('click', () =>{ 
            console.log(data[i]);  
            const modal = document.querySelector('.modal-container');
            modal.style.display = '';
           updateMod(data[i]);
   
        });
 
    }
}
/**
 * post data
 * 
*/


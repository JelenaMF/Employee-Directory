/**
 * Global Variables for creating DOM elements 
 * 
*********************************************/
const gallery = document.getElementById('gallery');
const prevBttn = document.querySelector('.modal-prev');
const nextBttn = document.querySelector('.modal-next');

let profiles = [];
let currentCard = 0;
//search markup

const searchDiv = document.querySelector('.search-container');
searchDiv.insertAdjacentHTML('beforeend', `
    <form action="#" method="GET">
        <input type="search" id="search-input"
        class="search-input" placeholder="Search...">
        <input type="submit" value="Search" id="search-submit" class="search-submit">
    </form>
`)
const searchButton = document.querySelector('.search-submit');
console.log(searchButton);
const searchInput = document.querySelector('.search-input');
const employees = 'https://randomuser.me/api/?results=12&nat=us';

/**
 * Fetch functions
 * fetches the API data 
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
        .then(data => {
        const employees = data.results;
        generateProfiles(employees);
        generateProfileMods(employees);
        callCard(employees);
        profiles = data.results;
        browseEmp(employees);
    }) 
  
/**
 * Helper functions
 * generateProfile() function grabs employee data from API 
 * 
 * @para data JSON object
 * @para emp JSON object
 * 
*/
function generateProfiles(data) {
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

function generateProfileMods() {
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
}

function updateMod(emp) {
    const date = new Date (`${emp.dob.date}`);
    const month = date.getMonth() + 1,
        day = date.getDate(),
        year = date.getFullYear();
    const mmddyy = `${month}/${day}/${year}`; 
    const modalInfo = document.querySelector('.modal-info-container');
    modalInfo.innerHTML = '';
    modalInfo.insertAdjacentHTML('afterbegin', `
        <img class="modal-img" src=${emp.picture.large} alt="profile picture">
        <h3 id="name" class="modal-name cap">${emp.name.first} ${emp.name.last}</h3>
            <p class="modal-text">${emp.email}</p> 
            <p class="modal-text cap">${emp.phone}</p>
        <hr>
            <p class="modal-text">${emp.location.street.number} ${emp.location.street.name} 
            ${emp.location.city} ${emp.location.state}</p>
            <p class="modal-text">Birhday: ${mmddyy}</p>
    `)
  
}

function browseEmp(data, index) {
    const modal = document.querySelector('.modal');
    const nextBttn = document.querySelector('.modal-next');
    const prevBttn = document.querySelector('.modal-prev');
    const cards = document.querySelectorAll('.card');

    for(const [i, card] of cards.entries()) {
        card.addEventListener('click', (e) => { 
            index = data.indexOf(data[i]);
        });
      
    }
    
    nextBttn.addEventListener('click', () => {
        index++ 
          if(index == 11) {
            nextBttn.setAttribute('disabled', true);
        }
        if(index >= data.length) {
            index = -1;
        } if(index <= data.length) {
            console.log(index);
            updateMod(data[index]);
        }
        //disable next button at the last modal
       
    });
  
    prevBttn.addEventListener('click', () => {
        index--
        if(index == 0) {
            prevBttn.setAttribute('disabled', true);
        }
        if(index <= -1 ) {
            index = -1;
        } if(index <= data.length) {
            console.log(index);
            updateMod(data[index]);
        }
  
    });
}

   
/**
 * Event listeners 
 * @para data JSONobject pushes data from an employee card 
*/
function callCard(data){    
    profiles.push(data);
    console.log(profiles);
    const modal = document.querySelector('.modal-container');
    const cards = document.querySelectorAll('.card');
    //give each class an click handler that displays a modal with employees information from API
    for(const [i, card] of cards.entries()) {
        card.addEventListener('click', (e) => { 
            modal.style.display = '';
            updateMod(data[i]);
        });

    }
   
}
//create a function that will handle the searchButton responses in the helper
//function section 
 // searchButton.addEventListener('click', () => {
    //     const matches = [];
    //     const filter = searchInput.value;
    //     // console.log('search button clicked');
    //     for(let i = 0; i < profiles.length; i++) {
    //         const employeeProf = profiles[i];
    //         console.log(employeeProf);
    //         const employeeName = document.querySelector('#name').innerText.toLowerCase();
    //         employeeProf.style.display = 'none';
    //         // console.log(employee);
    //         if(employeeName.includes(filter)) {
    //             matches.push(employeeProf);
    //         }
    //         generateProfiles(matches);
    //         searchInput.value = '';
    //     }
    // });
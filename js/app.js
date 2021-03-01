/**
 * Global Variables for creating DOM elements 
 * 
*********************************************/
const gallery = document.getElementById('gallery');
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
        generateProfiles(data.results);
        generateProfileMods(data.results);
        callCard(data.results)
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
    //an empty array to append ethe current list of employees for the search bar. 
    // const profiles = [];
    // profiles.push(data);
    // console.log(profiles);
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

function renderCardItem(card) {
    return updateMod(card);
}

function renderCard() {
    let empProfile = profiles[currentCard];
    let html = renderCardItem(empProfile);

    document.querySelector('.modal-container').innerHTML = html;
}

function prevCard(card) {
    //add conditional statement that disables the prevBttn 
        //if currentCard is the first index 
    if(profiles > 0) {
        //set attribute to disable true for previous button
        document.querySelector('.modal-prev').setAttribute('disabled', true);
        //remove attribute disable for next button
        document.querySelector('.modal-next').remmoveAttribute('disabled');
        currentCard -= 1
        renderCard();
    } 
}

function nextCard(card) {
    if(currentCard < profiles.length - 1) {
        document.querySelector('.modal-next').setAttribute('disabled', true);
        document.querySelector('.modal-prev').removeAttribute('disabled');
        currentCard += 1
        renderCard();
    }
}

/**
 * Event listeners 
 * @param data JSONobject
*/
function callCard(data){
    //an empty array to append ethe current list of employees for the search bar. 
    
    profiles.push(data);
    console.log(profiles);
    // let currentCard = 0;
    const prevBttn = document.querySelector('.modal-prev');
    const nextBttn = document.querySelector('.modal-next');

    const modal = document.querySelector('.modal-container');
    const modalInfo = document.querySelector('.modal-info-container');
    const cards = document.querySelectorAll('.card');
    for(const [i, card] of cards.entries()) {
        
        card.addEventListener('click', (e) => { 
            modal.style.display = '';
            updateMod(data[i]);
            console.log(modal.value = i);
            //renderCard();   

            if (modal.value === 0) {
                prevBttn.setAttribute('disabled', true);
            }
            if(modal.value === 11) {
                nextBttn.setAttribute('disabled', true);
            }
        prevBttn.addEventListener('click', (e) => {
            modalInfo.style.display = 'none';
            console.log(prevCard());


        
                });

        nextBttn.addEventListener('click', (e) => {
            console.log(nextCard(cards));
                console.log('current button click is next');
                });
        
        });
   
    }

    searchButton.addEventListener('click', () => {
        // const matches = [];
        // const filter = searchInput.value.toLowerCase();
        // console.log('search button clicked');
        // for(let i = 0; i <= cards.length; i++) {
        //     const employeeProf = cards[i];
        //     //console.log(employeeProf);
        //     const employee = employeeProf.querySelector('h3');
        //     console.log(employee);
        //     employeeProf.style.display = 'none';
        //     if(employee.includes(filter)) {
        //         matches.push(employeeProf);
        //     }

        // }
    });
// function prev(data){
    
    //start position
    // if(i == 1) {
    //     prevBttn.setAttribute('disabled', true);
    //     nextBttn.setAttribute('disabled', false);
    // } else {
    //     i--;
    //     return setNewCard();
    // }
// }

// function next(data){    
    // if(i == 12) {
    //     nextBttn.setAttribute('disabled', true);
    //     prevBttn.setAttribute('disabled', false);
    // } else {
    //     i++;
    //     return setNewCard(card);
    // }
// }
// function setNewCard(data){
//     //change card 
    
//     console.log('new card');

// }
           //target the previous and next button 

       //create an eventlister for 
    //    prevBttn.addEventListener('click', () => {
    //     prev(data);
       

    // });
    //  nextBttn.addEventListener('click', (e) => {
    //      next(data)
    //  });
}


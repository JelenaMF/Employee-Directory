/**
 * Global Variables for creating DOM elements 
 * 
*********************************************/
const gallery = document.getElementById('gallery');
//search markup

const searchDiv = document.querySelector('.search-container');
searchDiv.insertAdjacentHTML('beforeend', `
    <form action="#" method="GET">
        <input type="search" id="search-input"
        class="search-input" placeholder="Search...">
        <input type="submit" value="Search" id="search-submit" class="search-submit">
    </form>
`)

const employees = 'https://randomuser.me/api/?results=12&nat=us';

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
        .then(data => {
        generateProfiles(data.results);
        generateProfileMods(data.results);
        callCard(data.results)
    })

      
/**
 * Helper functions
 * 
*/
function generateProfiles(data) {const empProfiles = [];

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

}

//function for creating 
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

/**
 * Event listeners 
 * 
*/
function callCard(data){
const cards = document.querySelectorAll('.card');
const prevBttn = document.querySelector('.modal-prev');
    prevBttn.setAttribute('disabled', true);
const nextBttn = document.querySelector('.modal-next');
    nextBttn.setAttribute('disabled', true);
    for(const [i, card ]of cards.entries()) {
        card.addEventListener('click', () => { 
            const modal = document.querySelector('.modal-container');
            modal.style.display = '';
            updateMod(data[i]);
            
       //target the previous and next button 

       //create an eventlister for 
       prevBttn.addEventListener('click', () => {
           //if current card modal is the first card 
           if( cards.indexOf(0) === 0) {
                //enable next button
               nextBttn.setAttribute('disabled', false);
        //else if current card modal is not the first card 
            //remove disabled attribute on previous button 
            //display previous modal card
           } else {
               prevBttn.disabled = false;
               //display previous card in modal
               updateMod(data[i]);

           }
           console.log("previous button clicked");
             
       })
            nextBttn.addEventListener('click', () => {
            //if current card is the last card 
                //remove disabled attribute on previous button 
                if(data[i] === 11) {
                    prevBttn.disabled = false;
                    
            //else if current card is not the last card 
                //enable next button
                //display next card modal 
                } else {
                    nextBttn.disabled = false;
                    //show next card
                }
                console.log('nxt bttn clicked')
             })
        });
    }
}


/**
 * Global Variables 
 * 
*********************************************/
const gallery = document.getElementById('gallery');

const employees = 'https://randomuser.me/api/?results=12&nat=us';

/**
 * Fetch functions
 * fetches the API data and checks for errors 
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
    
    }) 
  
/**
 * Helper functions
 * generateProfile() function grabs employee data from API and creates a card
 * for them.
 * generateProfileMod() function creates a modal for the employees 
 * updatemod() function will update the modals of the employee which will be used
 * in the generatProfileMod function 
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
   
/**
 * Event listeners 
 * @para data JSONobject pushes data from an employee card to the modal
 * that will display a modal with the updates once the card is clicked 
*/
function callCard(data){    
  
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

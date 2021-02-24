/**
 * Global Variables for creating DOM elements 
 * 
*********************************************/
const gallery = document.getElementById('gallery');
console.log(gallery);
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

//modal markup

// modalContainer.style.display = 'none';
 


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
    .then( data => {
        generateProfiles(data.results)})
    .then(data => {
        const cards = document.querySelectorAll('.card');
        for(const card of cards) {
// Add click handlers to cards so that clicking card displays modal and adds employee specific data
            card.addEventListener('click', (e) =>{ 
                console.log(generateProfileMods(data))
            
            } );

        }
    })
      
/**
 * Helper functions
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
    gallery.insertAdjacentHTML('beforeend', profile)
}

function generateProfileMods(data) {
    gallery.insertAdjacentHTML('beforeend', `
    <div class="modal-container">
    <div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
    <img class="modal-img" src=${data.picture.large} alt="profile picture">
    <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
        <p class="modal-text">${data.email}</p> 
        <p class="modal-text cap">${data.location.city}</p>
    <hr>
        <p class="modal-text">${data.phone}</p>
        <p class="modal-text">Birhday: ${data.dob.date.slice(5,7)}/${data.dob.date.slice(8,10)}/${data.dob.date.slice(0,4)}</p>
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
    xBtn.addEventListener('click', (e) => {
        modal.style.display = 'none'}) 
}

function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

/**
 * Event listeners 
 * 
*/

/**
 * post data
 * 
*/


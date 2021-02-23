/**
 * Global Variables for creating DOM elements 
 * 
*********************************************/
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
    .then( data => {
        generateProfiles(data.results)
        const modalContainer = document.createElement('div');
        document.querySelector('body').appendChild(modalContainer);
        const modalContent = `
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                   
                </div>
            </div> 
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
        `;
        modalContainer.insertAdjacentHTML('beforeend', modalContent);
        modalContainer.style.display = 'none';

        const xBtn = document.querySelector('.modal-close-btn');
        xBtn.addEventListener('click', (e) => {
            modalContainer.style.display = 'none'})

        console.log(modalContainer);
        const cards = document.querySelectorAll('.card');
        for(const card of cards) {
            card.addEventListener('click', (e) => {
                modalContainer.style.display = '';
                generateModInfo(data);
            });
        }
    })
       
/**
 * Helper functions
 * 
*/
function generateProfiles(data) {
    const gallery = document.getElementById('gallery');
    console.log(gallery);
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

function generateModInfo(emp) {
    const empDetails = `
        <img class="modal-img" src="${emp.picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${emp.name.first} ${emp.name.last}</h3>
        <p class="modal-text">${emp.email}</p> 
        <p class="modal-text cap">${emp.location.city}</p>
        <hr>
        <p class="modal-text">(555)-555-5555</p>
        <p class="modal-text">Birhday: 10/21/2015</p>`;
       return empDetails;
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
// function pullProfile(e){
//     e.preventDefault();
//     fetchData(employees)
//     .then(data => generateProfileMods(data.results));

// }

// modalContainer.insertAdjacentHTML('beforeend', `
//     <div class="modal">
//         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//         <div class="modal-info-container">
//         <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
//         <h3 id="name" class="modal-name cap">name</h3>
//             <p class="modal-text">email</p> 
//             <p class="modal-text cap">city</p>
//             <hr>
//             <p class="modal-text">(555)-555-5555</p>
//             <p class="modal-text">Birhday: 10/21/2015</p>
//         </div>
//     </div>
// `)
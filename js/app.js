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

//modal markup

// modalContainer.style.display = 'none';
 


/**
 * Fetch functions
 * 
*/
function fetchData(url){
    return fetch(url)
            .then(results => results.json())
            .catch(error => console.log('Looks like there was a problem', error))
}

//create a fetch function that fetches employees parsing it to json 
fetchData(employees) 
    .then( data => generateProfiles(data.results))
    .then(data => {
        const card = document.querySelector('.card');
        card.addEventListener('click', generateProfileMods);
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
const card = document.querySelector('.card');
function generateProfileMods(data) {
    const modalContainer = document.createElement('div');
    document.querySelector('body').appendChild(modalContainer);
// console.log(modalContainer);
    const employee = data => `
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
        </div>
    `;
    console.log(employee);
    modalContainer.insertAdjacentHTML('beforeend', employee);
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
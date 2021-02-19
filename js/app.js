
/**
 * Global Variables for creating DOM elements 
 * 
*/
//search markup
const searchDiv = document.querySelector('.search-container');
searchDiv.insertAdjacentHTML('beforeend', `
    <form action="#" method="GET">
        <input type="search" id="search-input"
        class="search-input" placeholder="Search...">
        <input type="submit" value="Search" id="search-submit" class="search-submit">
    </form>
`)
 console.log(searchDiv);

//gallary markup
const gallery = document.getElementById('gallery');
console.log(gallery);
gallery.insertAdjacentHTML('beforeend', `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="https://placehold.it/90x90" alt="profile picture"> 
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">first last</h3>
            <p class="card-text">email</p>
            <p class="card-text cap">city, state, </p>
        </div>
    </div>
`)

//modal markup
const modalContainer = document.createElement('div');
document.querySelector('body').appendChild(modalContainer);
console.log(modalContainer);
modalContainer.insertAdjacentHTML('beforeend', `
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
        <h3 id="name" class="modal-name cap">name</h3>
            <p class="modal-text">email</p> 
            <p class="modal-text cap">city</p>
            <hr>
            <p class="modal-text">(555)-555-5555</p>
            <p class="modal-text">Birhday: 10/21/2015</p>
        </div>
    </div>
`)

/**
 * Fetch functions
 * 
*/
function fetchData(url) {
    return fetch(url)
    .then(checkStatus)
    .then(data => (console.log(data)))
}

Promise.all([
    fetchData('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole')
])
/**
 * Helper functions
 * 
*/
function checkStatus(res) {
    if(res.ok) {
        return Promise.resolve(res)
    } else {
        return Promise.reject(new Error(res.statusText))
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
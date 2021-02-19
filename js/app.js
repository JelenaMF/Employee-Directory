
/**
 * Global Variables for creating DOM elements 
 * 
*/
//search markup
const searchDiv = document.querySelector('.search-container');
console.log(searchDiv);
const myForm = document.createElement('form');
myForm.action = "#";
myForm.method = "GET"
searchDiv.appendChild(myForm);

const searchInput = document.createElement('input');
searchInput.type = "search";
searchInput.id = "search-input";
searchInput.className = "search-input";
searchInput.placeholder = "Search...";
myForm.appendChild(searchInput);
const submitSearch = document.createElement('input');
submitSearch.type = "submit";
submitSearch.value = "Search";
submitSearch.id = 'search-submit';
submitSearch.className = 'search-submit';
myForm.appendChild(submitSearch);


//create a div with class modal-container set to template literals 
    //`
        //<div class="modal">
        //  <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button> 
        //  <div class="modal-info-container">
        //  <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
        //  <h3 id="name" class="modal-name cap">name</h3>
        //      <p class="modal-text">email</p>
           //   <p class="modal-text cap">city</p>
            //  <hr>
            //  <p class="modal-text">(555) 555-5555</p>
            //  <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
             // <p class="modal-text">Birthday: 10/21/2015</p>
            //</div>
        //</div>
    //`
    //create a variable modalDiv set to createElement div 
        //give it className modal 
    //append div.modal to div.modal-container
        //create a button 
            //class name modal-close-btn
            //type attribute button 
            //id modal-close-btn
    //create a div with class modal-info-container
/**
 * Fetch functions
 * 
*/

/**
 * Helper functions
 * 
*/

/**
 * Event listeners 
 * 
*/


/**
 * post data
 * 
*/
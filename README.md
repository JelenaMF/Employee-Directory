# public_api_request

# Awesome Startup Company app

This app is built for the Awesome Startup company who has remote employees working all over the world needing a better way to share contact information. 

## Goal 
- [X] grab 12 random employees and use the data to build a prototype for an employee directory using the [Random User Generator API ](https://randomuser.me/)
- [X] list the 12 employees in a grid with their thumpnail image, full name, email, location by requesting a JSON object from the API and parsing the data.
- [X] clicking the employee's image or name will open a modal window with more detailed information, such as their birthday and address.
- [X] reformat DOB 

Meet exceeds goals that I wasn't able to complete 
- [ ] create a functioning search field that finds matches from the input in the array 
- [ ] preview button is disabled on the first employee profile
- [ ] next button is disabled on the last employee profile
- [ ] when next button is clicked the next employee profile is displayed
- [ ] when previous button is clicked the previous employee profile is display
- [ ] changing CSS styles
- [ ] add some animation (personal preference) 


Formatted the employee birthdays using the tips from [Format Date - stackover flow](https://stackoverflow.com/questions/24214319/how-to-format-date-in-javascript-returned-from-ajax-request-to-c-sharp-web-api)

Challenges in creating code: 
- updating data in modal when the next/previous button has been clicked found this article which helped me create the functions for this app [how to create a click previous/next through JSON](https://www.sitepoint.com/community/t/how-to-create-a-click-previous-next-through-a-json-ajax-success-return/222526/3)

Tried to get the exceeds credit but got stuck on the previous and next buttons though I was able to figure out how to get the next and previous buttons to display the next or last employee in the array using this example [commits that created functioning next and previous buttons](https://github.com/JelenaMF/public_api_request/commit/d59763cb4b6ecaa5e25d112a5a052d3368c38fca)
[the entire code of the previous commit](https://github.com/JelenaMF/public_api_request/tree/d59763cb4b6ecaa5e25d112a5a052d3368c38fca) I was unable to disable the previous/next buttons when they got to the last of the array item or the beginning of the array list. If I managed to get it to work it would disable in the middle of the employee list. 

Spent so long working on the next/previous buttons I didn't have enough time to complete the other points. 

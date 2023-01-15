const deleteBtn = document.querySelectorAll('.fa-trash') //creating a variable named deleteBtn that selects all elements with the class of fa-trash
const item = document.querySelectorAll('.item span') //creating a variable named item that selects all span elements within the class of item
const itemCompleted = document.querySelectorAll('.item span.completed') //creating a variable named itemCompleted that selects all elements with a completed class within a span and within elements with the class of item

Array.from(deleteBtn).forEach((element)=>{ //Selects each variable using a for loop(forEach) from the deleteBtn variable and forming an array of the items
    element.addEventListener('click', deleteItem) //add an event listener to each item in the newly created array that activates when clicked and will activate the function of deleteItem
})

Array.from(item).forEach((element)=>{ //Selects each variable using a for loop(forEach) from the item variable and forming an array of the items
    element.addEventListener('click', markComplete) //add an event listener to each item in the newly created array that activates when clicked and will activate the function of markComplete
})

Array.from(itemCompleted).forEach((element)=>{ //Selects each variable using a for loop(forEach) from the itemCompleted variable and forming an array of the items
    element.addEventListener('click', markUnComplete) //add an event listener to each item in the newly created array that activates when clicked and will activate the function of marukUnComplete
})

async function deleteItem(){ //declaring an asynchronus function named deleteItem
    const itemText = this.parentNode.childNodes[1].innerText //creates a variable named itemText that looks inside of the span within the first item of list because the span is nested inside the list (hence index 1 or second item in the index of the parent element) in order to extract the text value
    try{ //starting a try block
        const response = await fetch('deleteItem', { //create a variable of response that waits on a fetch to get data or an error from deleteItem route
            method: 'delete', //sets the delete method for the route
            headers: {'Content-Type': 'application/json'}, //Specifying the type of content expected, in this case json
            body: JSON.stringify({ //declares the message content being passed and stringifying that content
              'itemFromJS': itemText //setting the content of the body to the inner text of the list item and naming it 'itemFromJS'
            }) //closing the body
          }) //closing the object parameter in response variable
        const data = await response.json() //waiting for the server to give us a response of json
        console.log(data) //console log the json data received
        location.reload() //reloads the page to indicate changes made in the function

    }catch(err){ //if an error occurs, pass the error into the catch block
        console.log(err) //log the error to the console
    } //close the catch block
} //end of the deleteItem function

async function markComplete(){ //declaring an asynchronus function named markComplete
    const itemText = this.parentNode.childNodes[1].innerText //creates a variable named itemText that looks inside of the span within the first item of list because the span is nested inside the list (hence index 1 or second item in the index of the parent element) in order to extract the text value
    try{ //starting a try block
        const response = await fetch('markComplete', { //create a variable of response that waits on a fetch to get data or an error from markComplete route
            method: 'put', //sets the put method for the route
            headers: {'Content-Type': 'application/json'}, //Specifying the type of content expected, in this case json
            body: JSON.stringify({ //declares the message content being passed and stringifying that content
                'itemFromJS': itemText //setting the content of the body to the inner text of the list item and naming it 'itemFromJS'
            }) //closing the body
          }) //closing the object parameter in response variable
        const data = await response.json() //waiting for the server to give us a response of json
        console.log(data) //console log the json data received
        location.reload() //reloads the page to indicate changes made in the function

    }catch(err){ //if an error occurs, pass the error into the catch block
        console.log(err) //log the error to the console
    } //close the catch block
} //end of the deleteItem function

async function markUnComplete(){ //declaring an asynchronus function named markUnComplete
    const itemText = this.parentNode.childNodes[1].innerText //creates a variable named itemText that looks inside of the span within the first item of list because the span is nested inside the list (hence index 1 or second item in the index of the parent element) in order to extract the text value
    try{ //starting a try block
        const response = await fetch('markUnComplete', { //create a variable of response that waits on a fetch to get data or an error from markUnComplete route
            method: 'put', //sets the put method for the route
            headers: {'Content-Type': 'application/json'}, //Specifying the type of content expected, in this case json
            body: JSON.stringify({ //declares the message content being passed and stringifying that content
                'itemFromJS': itemText //setting the content of the body to the inner text of the list item and naming it 'itemFromJS'
            }) //closing the body
          }) //closing the object parameter in response variable
        const data = await response.json() //waiting for the server to give us a response of json
        console.log(data) //console log the json data received
        location.reload() //reloads the page to indicate changes made in the function

    }catch(err){ //if an error occurs, pass the error into the catch block
        console.log(err) //log the error to the console
    } //close the catch block
} //end of the deleteItem function
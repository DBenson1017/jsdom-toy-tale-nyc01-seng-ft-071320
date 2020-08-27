let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // May need to do a patch fetch to change the lines in the json .db
  // function addLike(e){
  //     e.preventDefault()
  //     let crd= e.target.parentNode
  //     console.log('setting card to variable worked')
  //     lks= crd.querySelector('p')
  //     console.log('finding p worked')
  //     lks.value = parseInt(lks.value, 10)
  //     // lks.value++
  //     console.log('likes should have incremented')
  // }

  function renderToys(object) {
   //a function to receieve toy instances from the iterator (from the 'getToys()' function) in the fetch response, which appends it onto the DOm 
    let card = document.createElement('div')
    card.setAttribute('class', 'cards')
    let h2 = document.createElement('h2')
    h2.innerText = object.name
    card.append(h2)
    let pic = document.createElement('img')
    pic.src = object.image
    card.append(pic)
    let likes = document.createElement('p')
    likes.innerText = object.likes
    let liker = document.createElement('button')
    liker.setAttribute('class', 'like-btn')
    liker.setAttribute('id', object.id)
    liker.innerText = "like"
    card.append(likes)
    card.append(liker)
    liker.addEventListener('click', function(e) {
      addLike(e)
      // console.log(e.target.parentNode)
      // console.log(e.target.parentNode)
      // console.log(e.target.parentNode)
      // // likes(e)
    })
    let collection = document.querySelector('#toy-collection')
    collection.append(card)
  }

  //button event listener that ++ likes 

  // fetch request to the toys json api 
  function getToys(){
    fetch("http://localhost:3000/toys").then(function(response){
      return response.json();
    })
      .then(function(object){
        // iterates through the json response, each instance is sent to the renderToys function above 
        object.forEach(object => renderToys(object)) 
     })
  }
  getToys() //automatically runs the fetch() once DOM is loaded 

  // function postToys(){
      // Post the data to the http addresss
      // collect the data the from the form, including a preventDefault
      
      // define our configObj ; HHTP verb, headers/metadata, data stringified in body 

     


      //POST fetch request with configObj

      //conver the returned data to a usable object 
      //pass that object through the renderToys function 

  function postToy() {
    
      let nameInput = document.getElementsByClassName('input-text').name.innerText
      let imgInput = document.getElementsByClassName('input-text').image.innerText

     let data = {
            "name": nameInput, 
            "image": imgInput,
            "likes": 0
     }

     let configObj = {  
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
           },
      body: JSON.stringify(data)
      }
    
    fetch('http://localhost:3000/toys', configObj)
          .then(function(response){
            return response.json();
          })
          .then(function(object){
            renderToys(object);
          })
          }
    
  

}); // end of DOM Content Loader listener 

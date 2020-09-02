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

  let addToyBtn = document.querySelector('.add-toy-form')
  let toyCollection = document.querySelector('#toy-collection')

  const toyFetch = () =>
  fetch('http://localhost:3000/toys')
    .then(function (response){
      return response.json()
    })
    .then(function (data){
      toyIterator(data)
      console.log(data)
    })
  // end of toyFetch 

  const toyIterator= data => {
    console.log('entered toyIterator')
    data.forEach(toy => renderToys(toy))
  } // end of toyRender 

  const renderToys= (toy) => {
    console.log('enter renderToys')
    // console.log(toy.name)
    // console.log(toy)
    let card = document.createElement('div')
    console.log(card)
    card.setAttribute('class', 'card')
    card.innerHTML=` 
          <h2> ${toy.name}</h2>
          <img src= ${toy.image} class='toy-avatar' /> 
          <p>${toy.likes}Likes</p> 
          <button class='like-btn'>Like <3 </button>   
    `
    toyCollection.append(card)
  } // end of renderToys


// #####create new toy card #################################

//event listener for create button click 
//prevent form default
//grab input values 
//pass to function for onject 
//pass to fetch request 

document.addEventListener('submit', function(e){
  e.preventDefault()
  console.log('new toy clicked')
      if (e.target === addToyBtn){
        console.log(e.target.closest('.add-toy-form'))
        let name = e.target.name
        let image = e.target.image
        let data = {
          name: name,
          image: image, 
          likes: 0
        }
        console.log(data)
        // createNew(data)
      
    }
})// end of crete new to listener

function createNew(data){
  let options={
    method: "POST",
    headers: {
      'content-type':"application/json",
      'accept':'application/'
    },
    body: JSON.stringify(data)
  }

  fetch('http://localhost:3000/toys', options)
    .then(function (response){
      return response.json();
    })
    .then (function (object){
      console.log(object)
      renderToys(object)
    })

} // end of createNew






toyFetch()

}); // end of DOM Content Loader listener 

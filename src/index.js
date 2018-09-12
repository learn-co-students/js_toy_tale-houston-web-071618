const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const toyCollection = document.getElementById('toy-collection')

// YOUR CODE HERE
document.addEventListener('DOMContentLoaded',function(){
    addToys();
  })

  function addToys(){
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(processToys)
  }//addToys()
  function processToys(toyData){
    toyCollection.innerHTML = ""

    for(let toy of toyData){
      const toyID = toy.id
      const toyName = toy.name
      const toyImg = toy.image
      const toyLikes = toy.likes

      const myTemplate = makeToyTemplate(toyID, toyName, toyImg, toyLikes)
      toyCollection.innerHTML += myTemplate
    }//forLoop

    addEL()

  }//processToys()
  function addEL(){
    toyCollection.addEventListener("click",function(e){
      e.preventDefault()

      if(e.target.innerText === 'Like <3'){

        let clickedToy = e.target.parentElement
        let likeLevel = parseInt(clickedToy.children[2].innerText.split(' ')[0])

        likeLevel += 1
        clickedToy.children[2].innerText = `${likeLevel} Likes`

        fetch(`http://localhost:3000/toys/${e.target.parentElement.id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "likes":likeLevel
          })


        })//fetch PATCH

      }//if likes clcked
    })//toyCollectionEvent
  }//addEL()
  function makeToyTemplate(id,name,img,likes){
    return `<div class="card" id="${id}"">
      <h2>${name}</h2>
      <img src="${img}"class="toy-avatar">
      <p>${likes} Likes </p>
      <button class="like-btn">Like <3</button>
    </div>`
  }//makeToyTemplate()
  function createNewToy(){

    const tempName = toyForm.children[0][0].value
    const tempURL = toyForm.children[0][1].value

    if(tempName && tempURL)
    {
      fetch(`http://localhost:3000/toys`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "name": `${tempName}`,
          "image": `${tempURL}`,
          "likes": 0
        })

      })
      .then(addToys)//fetch post
    }else{
      alert("form ain't filled out, partner!");
    }

  }


  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  })//addBtnListener
  toyForm.addEventListener(`click`,(e) => {
    e.preventDefault()

    const whatClicked = e.target
    if(whatClicked.value === "Create New Toy"){
      createNewToy();
    }


  })//containerListener



// OR HERE!

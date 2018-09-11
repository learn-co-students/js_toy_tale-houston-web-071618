//Questions for Michael:

// I had a delay in finding method to complete the task of 'displaying the form when btn is clicked'.
// How do you do an event listener when nothing has a value and always returns null?
// What is your method for event delegation?
// String interpolation inside a fetch method.


const url = 'http://localhost:3000/toys'
const parseJSON = response => response.json()
const toyDiv = document.querySelector('#toy-collection')

fetch(url)
  .then(parseJSON)
  .then(addToysToPage)

function addToysToPage(toys) {
  toys.forEach(function(toy) {
// debugger
  toyDiv.innerHTML += `
    <div class= "card" data-id=${toy.id}>
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar">
      <p class="likes">${toy.likes} Likes <p>
        <button class="like-btn" id="${toy.id}">Like <3</button>
    </div>
  `
  })
}

if (toyDiv) {

    toyDiv.addEventListener('click', increaseLikes)


    function increaseLikes(event) {
      // debugger
      let current_count = parseInt(event.target.parentElement.parentElement.children[2].innerText.split(" ")[0])
          if(event.target.parentElement.parentElement.dataset.id === event.target.id) 
              {
                new_count = current_count+1
                event.target.parentElement.previousElementSibling.innerText = `
                    ${new_count} Likes
                `
                fetch(url + '/' + `${event.target.id}`, {
                    method: 'PATCH',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      "likes": new_count
                    })
                  })
              }
    }
}

const addToyBtn = document.getElementById('new-toy-btn')

addToyBtn.addEventListener('click', showFormOnPage)

function showFormOnPage(event) {

    event.preventDefault();
    const toyForm = event.target.parentElement.previousElementSibling
    let addToy = false

  // debugger

    if (toyForm.className === 'container') {
          addToy = !addToy
    }
  // debugger
    if (addToy) {
          toyForm.style.display = 'block';
    } else {
          toyForm.style.display = 'none';
    }
}

const submitBtn = document.querySelector('.submit')

submitBtn.addEventListener('click', addToyToDatabase)

function addToyToDatabase(event) {
// debugger
    fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": `${document.querySelectorAll('.input-text')[0].value}`,
          "image": `${document.querySelectorAll('.input-text')[1].value}`,
          "likes": 0
        })
    })
}

// // add the toys to the page
// const parseJSON = resp => resp.json()
// const url = 'http://localhost:3000/toys'

// function putToysOnPage(toys) {
// 	const toyCollectionDiv = document.getElementById('toy-collection')
// 	// const toyCollectionDiv = document.querySelector('#toy-collection')
// 	toys.forEach(function(toy) {
// 		toyCollectionDiv.innerHTML += `
//             <div data-id="${toy.id}" class="card">
//               <h2>${toy.name}</h2>
//               <img src="${toy.image}" class="toy-avatar">
//               <p>${toy.likes} Likes</p>
//               <button class="like-btn">Like <3</button>
//             </div>
//         `
// 	})
// }

// fetch(url)
// 	.then(parseJSON)
// 	.then(putToysOnPage)

// // new toy submission
// const addToyForm = document.querySelector('.add-toy-form')
// // const addToyForm = document.getElementsByClassName('add-toy-form')[0]
// addToyForm.addEventListener('submit', function(event) {
//   event.preventDefault();

//   let data = {
//     name: document.querySelectorAll('.input-text')[0].value,
//     image: document.querySelectorAll('.input-text')[1].value,
//     likes: 0
//   }

//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//     .then(parseJSON)
//     .then(putToysOnPage)
// })

// document.body.addEventListener('click', function increaseLikes(event) {
//   if (event.target.className === 'like-btn') {
//     let id = event.target.parentElement.dataset.id
//     let like = event.target.previousElementSibling
//     let likeCount = parseInt(event.target.previousElementSibling.innerText)
//     like.innerText = `${++likeCount} likes`


//     fetch(url + '/' + id, {
//       method: "PATCH",
//       headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//           },
//       body: JSON.stringify({likes: likeCount})
//     })
//       .then(parseJSON)
//       .then(console.log)
//     // console.log('clicked', event.target);
//   }
// })

// let addToy = false
// const addBtn = document.querySelector('#new-toy-btn')
// const toyForm = document.querySelector('.container')

// addBtn.addEventListener('click', () => {
//   // hide & seek with the form
//   addToy = !addToy
//   if (addToy) {
//     toyForm.style.display = 'block'
//     // submit listener here
//   } else {
//     toyForm.style.display = 'none'
//   }
// })


// // OR HERE!






// THIS IS ALL MY OLD CODE

// const url = 'http://localhost:3000/toys'
// const divId = document.getElementById.('toy-collection')
// function createNode(element) {
//   return document.createElement(element); // Create the type of element you pass in the parameters
// }
// function append(parent, el) {
//   return parent.appendChild(el); // Append the second parameter(element) to the first one
// }

// fetch(url)
// 	.then((response) => response.json())
// 		.then(function(data) {
// 			let toys = data.results;
// 			return toys.map(function(toy) {
// 				let div = createNode('div'),
// 			})
//   	});





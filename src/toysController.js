
function handleToyObjects(toys) {
    toy_collection.innerHTML = ''
    toys.forEach(toy => {
        addToyToPage(toy)
    })
}

function fetchToys() {
    fetch('http://localhost:3000/toys')
        .then(resp => resp.json())
        .then(toys => handleToyObjects(toys))
}

function addToyToPage(toy) {
    let toyInstance = new Toy(toy)
    toy_collection.innerHTML += (toyInstance.render())
}

function handleNewToy(event) {
    let newToy = createNewToy(event.target.name.value, event.target.image.value)

    addToyToDatabase(newToy)

    addToyToPage(newToy)

    event.target.name.value = ""
    event.target.image.value = ""

    handleAddToybutton()

}

function createNewToy(name, image, id, likes = 0) {
    if (id) {
        return { id: id, name: name, image: image, likes: likes }
    } else {
        return { name: name, image: image, likes: likes }
    }
}


function addToyToDatabase(newToy) {
    fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newToy)
    })
}

function handleLike(event) {
    let toyId = event.target.parentElement.parentElement.id
    let toyName = event.target.parentElement.parentElement.children[0].innerText
    let toyImage = event.target.parentElement.parentElement.children[1].src
    let toylikes = event.target.parentElement.parentElement.children[2].innerText.split(" ")[0]

    event.target.parentElement.parentElement.children[2].innerText = `${parseInt(toylikes) + 1} Likes`


    let toyToUpdate = createNewToy(toyName, toyImage, toyId, toylikes)

    updateFetch(toyToUpdate)

}
function updateFetch(toyObject) {
    fetch(`http://localhost:3000/toys/${toyObject.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toyObject)
    })
}

// {
//     "name": "Jessie",
//         "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
//             "likes": 0
// }

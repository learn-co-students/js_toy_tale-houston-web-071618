const Toy = (() => {
    return class {
        constructor(toyObject) {
            if (toyObject.id) {
                this.id = toyObject.id
            }
            this.name = toyObject.name
            this.image = toyObject.image
            this.likes = toyObject.likes
        }

        render() {
            return ` <div class="card" id="${this.id}">
    <h2>${this.name}</h2>
    <img src=${this.image} class="toy-avatar">
    <p>${this.likes} Likes <p>
    <button class="like-btn">Like <3</button>
  </div>`
        }
    }
})();
const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("div#dog-info")

const url = "http://localhost:3000/pups"

function fetchRequest(method, url, obj) { 
    return fetch(url, {
        method: method, 
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }, 
        body: JSON.stringify(obj)
    })
    .then(response => response.json())
}

function renderDogs() {
    return fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(dogData => dogData.forEach(dog => {
        const dogSpan = document.createElement("span")
        dogSpan.dataset.id = dog.id
        dogSpan.textContent = `${dog.name}`
        dogBar.append(dogSpan)

        dogSpan.addEventListener("click", handleDogSpan)
    }))
}
renderDogs()



function handleDogSpan(event) {
    fetch(`${url}/${event.target.dataset.id}`)
    .then(response => response.json())
    .then(dogObj => renderOneDog(dogObj))

}

function renderOneDog(dog) {
    const dogHeader = document.createElement("h2")
    const dogImage = document.createElement("img")
    const dogButton = document.createElement("button")
    dogButton.dataset.id = dog.id

    dogHeader.textContent = `${dog.name}`
    dogImage.src = `${dog.image}`
    if (dog.isGoodDog) {
        dogButton.textContent = "Good Dog!"
    }
    else {
        dogButton.textContent = "Bad Dog!"
    }

    dogButton.addEventListener("click", handleDogButton)

    dogInfo.append(dogHeader, dogImage, dogButton)
}

function handleDogButton (event) {
    if (event.target.textContent.includes("Good")) {
        event.target.textContent = "Bad Dog!"
        updatedValue = false
    }
    else {
        event.target.textContent = "Good Dog!"
        updatedValue = true
    }
    fetchRequest('PATCH',(`${url}/${event.target.dataset.id}`), {isGoodDog: updatedValue})

}




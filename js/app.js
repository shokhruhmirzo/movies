// javascript codes
let partMovies = movies.slice(0, 99)
let elList = document.querySelector('.movies__list')
let elCategory = document.querySelector('.js__category')
let elImg = document.querySelector('.white__heart')
let elOffcanvans = document.querySelector('.offcanvas__list')

// icon data 
let iconDate = []
dataRender(partMovies)
function dataRender(data) {
    if (window.localStorage.getItem('localMovie')) {
        iconDate = JSON.parse(window.localStorage.getItem('localMovie'))
    }
    elList.innerHTML = ''
    data.forEach((item, index) => {
        let newItem = document.createElement('li')
        newItem.innerHTML = `
        <li class="movies__item">
        <a href="https://www.youtube.com/watch?v=${item.ytid}" target="_blank" >
        <img src="https://i.ytimg.com/vi/${item.ytid}/hqdefault.jpg" alt="">
        </a>
        <div class="js__flex">
        <p class="movies__text">${item.movie_year}</p>
        <i onclick="img('${item.ytid}')" 
        class="${iconDate.find(i => i.ytid == item.ytid) ? "bi bi-heart-fill" : "bi-heart"}"></i>
        </div>
        <h3 class="movies__h3">${item.Title}</h3>
        <p class="categories">${item.Categories}</p>
        <p class="app__rating">${item.imdb_rating}</p>
    </li>
        `
        elList.appendChild(newItem)
    })
}
function fnYear(value) {
    if (value == 'old') {
        dataRender(partMovies.sort((a, b) => a.movie_year - b.movie_year));
    } else {
        dataRender(partMovies.sort((a, b) => b.movie_year - a.movie_year));

    }
}

function fnReating(value) {
    // created by shoxrux
    if (value == 'min') {
        dataRender(partMovies.sort((a, b) => a.imdb_rating - b.imdb_rating));
    } else {
        dataRender(partMovies.sort((a, b) => b.imdb_rating - a.imdb_rating));
    }
}

let arrCategory = []
partMovies.forEach((item) => {
    if (!arrCategory.includes(item.Categories)) {
        arrCategory.push(item.Categories)
    }
})
arrCategory.forEach(item => {
    let newOption = document.createElement('option')
    newOption.textContent = item
    newOption.value = item
    elCategory.appendChild(newOption)
})

function fnCategories(value) {
    dataRender(partMovies.filter((item) => item.Categories == value));
}

function search(e) {
    e.preventDefault()
    let mov = e.target.mov.value
    dataRender(partMovies.filter((i) =>
        i.Title.toString().toLowerCase().includes(mov.toLowerCase()) &&
        i.Title.toString().toLowerCase()[0] == mov.toLowerCase()[0]
    ))
};

function img(id) {
    var intialLocalData = []
    if (window.localStorage.getItem('localMovie')) {
        intialLocalData = JSON.parse(window.localStorage.getItem('localMovie'))
    }
    if (intialLocalData.find((item) => item.ytid == id)) {
        let filterDate = intialLocalData.filter((item) => item.ytid != id)
        window.localStorage.setItem('localMovie', JSON.stringify(filterDate))
    } else {
        intialLocalData.push(partMovies.find((item) => item.ytid == id))
        window.localStorage.setItem('localMovie', JSON.stringify(intialLocalData))
    }
    dataRender(partMovies)
}

function loveStory() {
    let getLoveStory = JSON.parse(window.localStorage.getItem('localMovie'))

    getLoveStory.forEach((item) => {
        let newLi = document.createElement('li')
        newLi.classList = "d-flex align-items-center justify-content-between"
        newLi.innerHTML = `
        <img width="40"  height="40" class="mt-3" src="https://i.ytimg.com/vi/${item.ytid}/hqdefault.jpg" alt="">
        <p>${item.Title}</p>
        <button onclick="shOpenMove('${item.ytid})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary">watch</button>
        `
        elOffcanvans.appendChild(newLi)
    })
}
let elMBody = document.querySelector('.modal-body')
function shOpenMove(id) {
    elMBody.innerHTML =
     `
        <iframe width="100%" height="300" src="https://www.youtube.com/embed/${id}" title="Ozoda  - Ko&quot;k jiguli  [Official Video 2024]" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `
}
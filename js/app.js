// javascript codes
let partMovies = movies.slice(0, 99)
let elList = document.querySelector('.movies__list')
let elCategory = document.querySelector('.js__category')
let elImg = document.querySelector('.white__heart')
dataRender(partMovies)

console.log(elImg);
function dataRender(data) {
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
        <img onclick="img('${item.ytid}')" class="white__heart" src="./img/white__heart.svg" alt="">
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

var intialLocalData = []
function img(id) {
    console.log(partMovies.find((item) => item.ytid == id));
    intialLocalData.push(partMovies.find((item) => item.ytid == id))
    window.localStorage.setItem('localMovie', JSON.stringify(intialLocalData))
}
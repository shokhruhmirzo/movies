let partMovies = movies.slice(0, 99)
let elList = document.querySelector('.movies__list')
let elCategory = document.querySelector('.js__category')
dataRender(partMovies)

function dataRender(data){
    elList.innerHTML = ''
    data.forEach((item, index) => {
        let newItem = document.createElement('li')
        newItem.innerHTML = `
        <li class="movies__item">
        <a href="https://www.youtube.com/watch?v=${item.ytid}" target="_blank" >
        <img src="https://i.ytimg.com/vi/${item.ytid}/hqdefault.jpg" alt="">
        </a>
        <p class="movies__text">${item.movie_year}</p>
        <h3 class="movies__h3">${item.Title}</h3>
        <p class="categories">${item.Categories}</p>
        <p class="app__rating">${item.imdb_rating}</p>
    </li>
        `
    
        elList.appendChild(newItem)
    })
}
function fnYear(value){
    if(value == 'old'){
        dataRender(partMovies.sort((a,b)=> a.movie_year - b.movie_year));
    }else{
        dataRender(partMovies.sort((a,b)=> b.movie_year - a.movie_year));

    }
}

function fnReating(value){
    if(value == 'min'){
        dataRender(partMovies.sort((a,b)=> a.imdb_rating - b.imdb_rating));
    }else{
        dataRender(partMovies.sort((a,b)=> b.imdb_rating - a.imdb_rating));
    }
}

let arrCategory = []
partMovies.forEach((item)=>{
    if(!arrCategory.includes(item.Categories)){
        arrCategory.push(item.Categories)
    }
})

// created by shoxrux

arrCategory.forEach(item=>{
    let newOption = document.createElement('option')
    newOption.textContent = item
    newOption.value = item
    elCategory.appendChild(newOption)
})

function fnCategories(value){
    dataRender(partMovies.filter((item)=> item.Categories == value));
}


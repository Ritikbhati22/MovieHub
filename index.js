const API_KEY = 'api_key=537a4a8b666eff5ba82510cb7241c3da';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data.results);
        showMovies(data.results);

    })
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const { title, overview, vote_average, poster_path } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `  <div class="movie">
            <img src="${IMG_URL+poster_path} " alt=" ${title}">
            <div class="movie-info ">
                <h3>${title} </h3>
                <span class="${getcolor(vote_average)}">${vote_average}</span>
            </div>
        </div>`
        main.appendChild(movieEl);

    });
}

function getcolor(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {

        return 'red';
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = null;
     searchTerm = search.value;
    console.log(searchTerm);
    if (searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    } else {
        getMovies(API_URL);
    }
})
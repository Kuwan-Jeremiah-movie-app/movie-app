document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }
};
//search input and button
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#moviesSearchable');
//movie
function movieSection(movies) {
    return movies.map((movie) => {
        if (movie.poster_path) {
            return `<img src=${IMAGE_URL + movie.poster_path} data-movie-id=${movie.id}>`;
        }
    })
}

//create movie container
function createMovieContainer(movies) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');
    const movieTemplate = `<section class="section">${movieSection(movies)}</section>
  <div class="content">
  <p id="content-close">X</p>
</div>`;
    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

//search onclick function
buttonElement.onclick = function (e) {
    e.preventDefault();
    const value = inputElement.value;
    const path = '/search/movie'
    const searchApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`;

    function renderSearchMovies(data) {
        //data.result[]
        const movies = data.results;
        const movieBlock = createMovieContainer(movies)
        movieSearchable.appendChild(movieBlock)
        console.log("Data: ", data);

    }

    fetch(searchApiUrl)
        .then((res) => res.json())
        .then(renderSearchMovies)
        .catch((error) => {
            console.log("Error: ", error)
        });
    inputElement.value = '';
    console.log("Value: ", value);
}
//event delegation
document.onclick = function (e) {
    const target = e.target;
    if (target.tagName.toLowerCase() === 'img') {
        const movieId = target.dataset.movieId; //save movie id into a variable
        const section = e.target.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display')
        // const path = `/movie/${movieId}/videos`;
        //https://api.themoviedb.org/3/movie/76341?api_key=<<api_key>>
        const url =  `https://themoviedb.org/3/movie${movieId}videos?api_key=${API_KEY}`;
        //fetch movie preview
        fetch(url)
            .then((res) => res.json())
            .then((data)=>{
                //display preview
                console.log('Videos: ', data);
            })
            .catch((error) => {
                console.log("Error: ", error)
            });
    }
    if (target.id === 'content-close') {
        const content = target.parentElement; //get section
        content.classList.remove('content-display'); //content
    }
}
//fetch glitch json
const movieApiUrl = "https://antique-innate-coreopsis.glitch.me/movies"
fetch(movieApiUrl).then(function (response) {
    response.json().then(function (movies) {
// console.log(movies)
    })
})
let title = $("#addMovie").val();
let rating = $("#addRating").val()
let genre = $("#addGenre").val()
let year = $("#addYear").val()

$("#addNew").click(function (e) {
    e.preventDefault();
    let title = $("#addMovie").val()
    let rating = $("#addRating").val()
    let genre = $("#addGenre").val()
    let year = $("#addYear").val()
    let poster = $("#addPoster").val()
    if (title === "" || rating === "" || genre === "" || year === "" || poster === "") {
        $(".addGroup input").addClass("required")
    } else {
        const movieObj = {
            "title": title,
            "rating": rating,
            "genre": genre,
            "year": year,
            "poster": poster
        };
        console.log(movieObj);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieObj),
        };
        fetch(movieApiUrl, options).then(function (response) {
            response.json().then(function (newMovie) {
                console.log(newMovie)
            })
        })

    }

})
$.ajax(movieApiUrl).done(function (data) {
    data.forEach(function (movie) {
        let movieHtml = `  <div class="card card-flip h-100"> <div class="card-front float-left" style="width: 18rem">`;
        movieHtml += `<img src='${movie.poster}' style="width: 100%; height: 100%" class="poster d-flex justify-content-between" alt="poster">
</div>`
        movieHtml += `<div class="card-back float-left" style="width: 18rem">`;
        movieHtml += `<h3 class="card-body">${movie.title.toUpperCase()}</h3>`
        movieHtml += `<h5>${movie.genre}</h5>`
        movieHtml += `<p>Rating: ${movie.rating}</p>`
        movieHtml += `<p>Year: ${movie.year}</p>`
        movieHtml += `<div><button type="button" class="btn btn-primary" id="${movie.id}" data-toggle="modal"  data-movie="${movie.id}" data-target="#exampleModal">
Edit Movie
</button>`
        movieHtml += `<button type="button" class="btn btn-danger" id="${movie.id}" data-toggle="modal"  data-movie="${movie.id}" data-target="#deleteModal">
Delete Movie
</button></div></div></div>`
        $("#movies").append(movieHtml)
    })
});

$('#exampleModal').on('shown.bs.modal', function (e) {
    let clickedButton = e.relatedTarget;
    let movieId = clickedButton.getAttribute('data-movie');
// This is the id of the movie. So now, I can set this in the form.
    console.log(movieId);
// Find the modal, and set this data attribute
    $('#exampleModal button#saveChanges').attr('data-movie', movieId);
})
// // //update radio buttons
$('#saveChanges').click(function (e) {
    e.preventDefault();
    const edit = {
        "title": document.querySelector('#addMovieModal').value,
        "genre": document.querySelector('#addGenreModal').value,
        "rating": document.querySelector('#addRatingModal').value,
        "year": document.querySelector('#addYearModal').value,
        "id": document.querySelector('#saveChanges').getAttribute('data-movie'),
        "poster": document.querySelector('#addPosterModal').value
    }
    const movieApiUrl = "https://antique-innate-coreopsis.glitch.me/movies"
    const patchMethod = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(edit),
    };
    fetch(movieApiUrl + "/" + edit.id, patchMethod).then(function (response) {
        console.log(response);
// console.log(data[0]);
    })
})
$('#deleteModal').on('shown.bs.modal', function (e) {
    let clickedButtonDelete = e.relatedTarget;
    let movieIdDelete = clickedButtonDelete.getAttribute('data-movie');
// This is the id of the movie. So now, I can set this in the form.
    console.log(movieIdDelete);
// Find the modal, and set this data attribute
    $('#deleteModal button#confirmDelete').attr('data-movie', movieIdDelete);
})
$("#confirmDelete").click(function (e) {
    e.preventDefault();
    let remove = {
        "title": document.querySelector('#addMovieModal').value,
        "genre": document.querySelector('#addGenreModal').value,
        "rating": document.querySelector('#addRatingModal').value,
        "year": document.querySelector('#addYearModal').value,
        "id": document.querySelector('#confirmDelete').getAttribute('data-movie'),
        "poster": document.querySelector('#addPosterModal').value
    }

    const deleteMethod = {
        method: 'DELETE', // Method itself
        headers: {
            'Content-Type': 'application/json',
        },
// body: JSON.stringify(remove),
    };
// Make the HTTP Delete call using fetch api
    fetch(movieApiUrl + "/" + remove.id, deleteMethod)
        .then(response => response.json())
        .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
        .catch(err => console.log(err)) // Do something with the error
})
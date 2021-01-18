document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }
};
//fetch
const movieApiUrl = "https://antique-innate-coreopsis.glitch.me/movies"
fetch(movieApiUrl).then(function (response) {
    response.json().then(function (movies) {
        console.log(movies)
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
    if (title === "" || rating === "" || genre === "" || year === "") {
        $(".addGroup input").addClass("required")
    } else {
        const movieObj = {
            "title": title,
            "rating": rating,
            "genre": genre,
            "year": year
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
        let movieHtml = ` <div class="card float-left" style="width: 18rem">`;
        movieHtml += `<img src='${movie.poster}' style="width: 100px; height: 100px" class="d-flex justify-content-between" alt="poster">`
        movieHtml += `<h3 class="card-body">${movie.title.toUpperCase()}</h3>`
        movieHtml += `<h5>${movie.genre}</h5>`
        movieHtml += `<p>Rating: ${movie.rating}</p>`
        movieHtml += `<p>Year: ${movie.year}</p>`
        movieHtml += `<div><button type="button" class="btn btn-primary" id="${movie.id}" data-toggle="modal"  data-movie="${movie.id}" data-target="#exampleModal">
        Edit Movie
    </button>`
        movieHtml += `<button type="button" class="btn btn-danger" id="${movie.id}" data-toggle="modal"  data-movie="${movie.id}" data-target="#deleteModal">
        Delete Movie
    </button></div></div>`
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
        "id": document.querySelector('#saveChanges').getAttribute('data-movie')
    }
    const movieApiUrl = "https://antique-innate-coreopsis.glitch.me/movies"
    // fetch(movieApiUrl).then(function (response) {
    //   response.json().then(function (movies) {
    //       console.log(movies)
    //   })
    // })
    // .searchID = movies.data.id;
    // const movieObj = {"title": title, "rating": rating, "genre": genre, "year": year};
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
    let remove ={
        "title": document.querySelector('#addMovieModal').value,
        "genre": document.querySelector('#addGenreModal').value,
        "rating": document.querySelector('#addRatingModal').value,
        "year": document.querySelector('#addYearModal').value,
        "id": document.querySelector('#confirmDelete').getAttribute('data-movie')
    }

    const deleteMethod = {
        method: 'DELETE', // Method itself
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify(remove),
    };
// Make the HTTP Delete call using fetch api
    fetch(movieApiUrl+"/"+ remove.id, deleteMethod)
        .then(response => response.json())
        .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
        .catch(err => console.log(err)) // Do something with the error
})




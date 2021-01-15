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
// const movieObj = {
//     "Title ": title,
//     "Rating ": rating
// };

const options = {
    method: 'POST',
}

// console.log(movieObj);
$("#addNew").click(function (e) {
    e.preventDefault();
    let title = $("#addMovie").val()
    let rating = $("#addRating").val()
    const movieObj = {
        "title": title,
        "rating": rating
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
// console.log(response)
        response.json().then(function (newMovie) {
            console.log(newMovie)
        })
    })
})

$.ajax(movieApiUrl).done(function (data) {
    data.forEach(function (movie) {
        let movieHtml = "<div> <div class=\"card \" style=\"width: 18rem;\">";
        movieHtml += `<img src='${movie.poster}' style="width: 100px; height: 100px" alt="">`
        movieHtml += `<div class="card-body">${movie.title.toUpperCase()}</div>`
        movieHtml += `<h5>${movie.genre}</h5>`
        movieHtml += `<p>Rating: ${movie.rating}</p>`
        movieHtml += `<p>Year: <br>${movie.year}</p></div>`
        movieHtml += `<span class="movieModal"><button type="button" class="btn btn-primary" id="${movie.id}" data-toggle="modal"  data-movie="${movie.id}" data-target="#exampleModal">
        Edit Movie
    </button></span><br><br><br></div>`
        $("#movies").append(movieHtml)
    })


});
// function editMovie(e){
//     e.preventDefault();
//
$("#exampleModal").on("shown.bs.model", function (e) {
    let clickedButton = e.relatedTarget;
    let movieId = clickedButton.getAttribute("data-movie");
    // console.log("The movie id is: " + movieId)
    console.log(movieId);
    $('#exampleModal button#saveChanges').attr('data-movie', movieId)
})

// // //update radio buttons
$('#saveChanges').click(function (e) {
    e.preventDefault();

//     // let movieTitleEditor = $("#addMovie").val();
//     // let movieRateEditor = $("#addRating").val();
    const edit = {
        "title": document.querySelector('#addMovieModal').value,
        "genre": document.querySelector('#addGenreModal').value,
        "rating": document.querySelector('#addRatingModal').value,
        "year": document.querySelector('#addYearModal').value,
        "id": document.querySelector('#exampleModal').getAttribute('id')
    }

    // const movieApiUrl = "https://antique-innate-coreopsis.glitch.me/movies"
    // fetch(movieApiUrl).then(function (response) {
    //   response.json().then(function (movies) {
    //       console.log(movies)
    //   })
    // })
    // .searchID = movies.data.id;
//

    const movieObj = {"title": title, "rating": rating};
    const patchMethod = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(edit),

    };

    fetch(movieApiUrl, patchMethod).then(function (response) {
        console.log(response);
        // console.log(data[0]);
    })

})
//
// $("#edit").click(function () {
//
//         fetch(movieApiUrl +  patchMethod).then(function (response) {
//             response.json().then(function (toEdit) {
//                 console.log(movies)
//             })
//
//         })
//     });
// })


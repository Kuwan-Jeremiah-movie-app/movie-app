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

// console.log(movieObj);
$("#addNew").click(function () {
    let title = $("#addMovie").val()
    let rating = $("#addRating").val()
    const movieObj = {
        "title": title,
        "rating": rating
    };
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
$("#movies").children().click(function(){

let movieTitleEditor=$("#addMovie").val();
let movieRateEditor=$("#addRating").val();
const editMovies={
    method: "PATCH",
    headers: {
        'Content-Type':'application/json',
    },
    body:JSON.stringify({title: movieTitleEditor}),
    body:JSON.stringify({rating: movieRateEditor})
};
})

$.ajax(movieApiUrl).done(function (data) {
    data.forEach(function (movie) {
        let movieHtml = "<tr>"
        movieHtml += `<td>Movie Title: <br>${movie.title.toUpperCase()}</br></td>`
        movieHtml += `<td>Movie Genre: <br>${movie.genre}</td>`
        movieHtml += `<td>Movie Rating: <br>${movie.rating}</br></td>`
        movieHtml += `<td>Movie Year: <br>${movie.year}</br></td>`
        movieHtml += `<td>Movie Graphics: <br> <img src='${movie.poster}' style="width: 100px; height: 100px" alt=""></td></tr>`
        $("#movies").append(movieHtml)
    })
})




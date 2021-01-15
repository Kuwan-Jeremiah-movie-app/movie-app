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
        let movieHtml = "<div> <div class=\"card\" style=\"width: 18rem;\">";
        movieHtml += `<img src='${movie.poster}' style="width: 100px; height: 100px" alt="">`
        movieHtml += `<div class="card-body">${movie.title.toUpperCase()}</div>`
        movieHtml += `<h5>${movie.genre}</h5>`
        movieHtml += `<p>Rating: ${movie.rating}</p>`
        movieHtml += `<p>Year: <br>${movie.year}</p></div>`
        movieHtml += `  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Edit Movie
    </button></div`
        $("#movies").append(movieHtml)
    })
});
// function editMovie(e){
//     e.preventDefault();
//
//
// // //update radio buttons
// // let selected = $('input:radio[name=movieTitle]').click(function () {
// //     console.log($(this.movie.title))
//     // let movieTitleEditor = $("#addMovie").val();
//     // let movieRateEditor = $("#addRating").val();
//     // const movieObj = {
//     //     "title": movieTitleEditor,
//     //     "rating": movieRateEditor
//     })
// //
//     const patchMethod = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({title: movieTitleEditor}),
//         body: JSON.stringify({rating: movieRateEditor})
//     };
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


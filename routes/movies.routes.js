// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const errorHandling = require("../error-handling");
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model");

// all your routes here
//show form to create a movie
router.get('/movies/create', (req, res, next) => {
    Celebrity.find().then((celeb) => {
        const {name} = req.body
        res.render('movies/new-movie', { celeb })
    })
    .catch((err) => {
        next(err)
    })
})

//post request for the movie entered in the form
router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    const newMovie = {
        title: title,
        genre: genre,
        plot: plot,
        cast: [cast]
    };

    //Creates the movie
    Movie.create(newMovie)
    .then(() => {
        console.log(newMovie);
        res.redirect('/movies')
    })
    .catch((err) => {
        console.log(err)
        res.render('movies/new-movie')
    })
})

//sends the data to appear in the browser
router.get('/movies', (req, res, next) => {
    Movie.find()
    .then((movies) => {
        console.log(movies)
        res.render('movies/movies', { movies })
    })
})

router.get('/movies/:id', (req, res, next) => {
 const { id } = req.params
    Movie.findById(id)
    .then((movie) => {
        console.log(id)
        res.render('movies/movie-details', { movie })
    })   
})


module.exports = router;
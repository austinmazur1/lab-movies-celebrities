// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const errorHandling = require("../error-handling");
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
//show form to create a movie
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebs) => {
    //   const { name } = req.body;
      res.render("movies/new-movie", { celebs });
    })
    .catch((err) => {
      next(err);
    });
});

//post request for the movie entered in the form
router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  const newMovie = {
    title: title,
    genre: genre,
    plot: plot,
    cast: Array.isArray(cast) ? cast : [cast],
  };

  //Creates the movie
  Movie.create(newMovie)
    .then(() => {
    //   console.log(newMovie);
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(err);
      res.render("movies/new-movie");
    });
});

//sends the data to appear in the browser
router.get("/movies", (req, res, next) => {
  Movie.find().then((movies) => {
    // console.log(movies);
    res.render("movies/movies", { movies });
  });
});

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
  .populate('cast')
  .exec((err, movie) => {
    if(err) {
    return next(err)
    }
    res.render("movies/movie-details", { movie });
    console.log(movie)
  });
})

//Delete movies

router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;
//   console.log(req.params);
  Movie.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      next(err);
    });
});

//Update movies
router.get('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params;

    Movie.findById(id)
    .then((movie) => {
        Celebrity.find()
        .then((celebs) => {
            res.render('movies/edit-movie', {movie, celebs})
        })
        .catch((err) => {
            next(err)
        })
    })
})


router.post('/movies/:id', (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    const { id } = req.params
console.log(req.body)
    Movie.findByIdAndUpdate(id,{
        title: title,
        genre: genre,
        plot: plot,
        cast: cast
    })
    .then(() => {
        res.redirect(`/movies/${id}`)
    })
    .catch((err) => {
        next(err)
    })
})
module.exports = router;

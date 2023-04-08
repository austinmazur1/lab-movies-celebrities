// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const errorHandling = require("../error-handling");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get('/celebrities/create', (req, res, next) => {
     //rendering the page with the form
    res.render('celebrities/new-celebrity')
})

//Handles the data the user enters
router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    const newCeleb = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    };

    //creates the new celebrity and adds to the db
    Celebrity.create(newCeleb)
    .then(() => {
        console.log(newCeleb);
        res.redirect('/celebrities');
    })
    .catch((err) => {
        console.log(err)
        res.render('celebrities/new-celebritiy')
    })
})

//List the celebs
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then((celeb) => {
        console.log(celeb)
        res.render('celebrities/celebrities', { celeb })
    })
    .catch((err) => console.log(err))
})

module.exports = router;
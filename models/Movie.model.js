//define the cast like that so its an array of the objectIDs
//using ref property allows us to then 'populate the cast field'

const { Schema, model } = require("mongoose");

const movieSchema = new Schema ({
    title: String,
    genre: String,
    plot: String,
    cast: [{type: Schema.Types.ObjectId, ref: 'Celebrity'}]
    // cast: [String]
})

module.exports = model("Movie", movieSchema);

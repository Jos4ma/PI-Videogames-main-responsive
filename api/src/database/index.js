const mongoose = require("mongoose")
require("dotenv").config()
const {MONGO_URI} = process.env
const conn = mongoose.createConnection(MONGO_URI)

var Videogame =  conn.model("Videogame",require("./schemas/videogameSchema"))
var Gender = conn.model("Genres", require("./schemas/genresSchema"))
// var perro = Videogame.find()
// console.log(perro)
module.exports = {
    Videogame,
    Gender,
} 


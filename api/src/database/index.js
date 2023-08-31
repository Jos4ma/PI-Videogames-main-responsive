const mongoose = require("mongoose")
// console.log(MONGO_URI)
require("dotenv").config()
const {MONGO_URI} = process.env
const conn = mongoose.createConnection(MONGO_URI)

module.exports = {
     Character: conn.model("Character", require("./schemas/characterSchema")),
     Film: conn.model("Film", require("./schemas/filmSchema")),
     Planet: conn.model("Planet", require("./schemas/planetSchema")),
     Perro: "mono",
     Videogame: conn.model("Videogame",require("./schemas/videogameSchema"))
}

// const mongoose = require("mongoose")
// const {MONGO_URI} = require("../config/envs")

// const conn = mongoose.createConnection(MONGO_URI)

//  const Character = conn.model("Character", require("./schemas/characterSchema"))
//  const Film = conn.model("Film", require("../database/schemas/filmSchema"))
//  const Planet = conn.model("Planet", require("../database/schemas/planetSchema"))

//  Character.find()
//             .populate("films", ["_id","title"])
//             .then((res) => console.log(res[0]))

// module.exports = {
//     Character: conn.model("Character", require("./schemas/characterSchema")),
//     Film: conn.model("Film", require("./schemas/filmSchema")),
//     Planet: conn.model("Planet", require("./schemas/planetSchema"))
// }

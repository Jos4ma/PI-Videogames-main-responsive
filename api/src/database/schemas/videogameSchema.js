const {Schema} = require("mongoose")

const videogameSchema = new Schema({
    _id: String,
    name: String,
    description: String,
    released: String,
    rating: String,
    platforms: String,
    image: String,
    // homeworld: { type: String, ref: "Planet"},
    // films: [{ type: String, ref: "Film"}]
})

videogameSchema.statics.list = async function (){
    return await this.find()
    //  .populate("homeworld", ["_id", "name"])
    //  .populate("films", ["_id", "title"])
}

videogameSchema.statics.get = async function (id){
    return await this.findById(id)
    // .populate("homeworld", ["_id", "name"])
    // .populate("films", ["_id", "title"])
}

videogameSchema.statics.insert = async function (videogame) {
    return await this.create(videogame)
}

module.exports = videogameSchema
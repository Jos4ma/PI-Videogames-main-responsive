const {Schema} = require("mongoose")

const genresSchema = new Schema({
    // _id: String,
    name: String,
//    videogame: {type: String, ref: "Videogame"}
})

genresSchema.statics.list = function () {
    return this.find()
            // .populate("res_idents",["_id","name"])
            // .populate("films", ["_id","title"])
}

genresSchema.statics.get = async function (id) {
    return this.findById(id)
            // .populate("res_idents",["_id","name"])
            // .populate("films", ["_id","title"])
}

genresSchema.statics.insert = async function (value) {
    return this.create(value)
} 

module.exports = genresSchema
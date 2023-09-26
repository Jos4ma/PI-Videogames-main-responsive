
const router = require("express").Router()
const { getDetail, joinAllDates, createMongDb, deleteMongoDb, getAllGenres } = require("../controllers/controllers")



router.get("/", joinAllDates)
router.get("/Detail/:id", getDetail)
router.post("/create", createMongDb)
router.delete("/delete/:_id", deleteMongoDb)
router.get("/genres", getAllGenres)




module.exports = router
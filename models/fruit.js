const mongoose = require("mongoose")

const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean
})

module.exports = mongoose.model("Fruit", fruitSchema)
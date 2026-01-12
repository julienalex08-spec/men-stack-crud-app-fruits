const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

mongoose.set("returnOriginal", false)

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

module.exports = mongoose.connection
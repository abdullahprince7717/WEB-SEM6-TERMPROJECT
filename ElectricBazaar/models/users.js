const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema({

    name: String,
    email: String,
    password: String

});

const userModel = mongoose.model("users", userschema);

module.exports = userModel;
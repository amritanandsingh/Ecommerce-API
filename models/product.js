const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    quantity:{
        type : Number,
        required : true
    }

}, {timestamps: true});

const productModel = mongoose.model("product",productSchema);
module.exports = productModel;

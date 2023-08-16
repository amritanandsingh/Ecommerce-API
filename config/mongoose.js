const mongoose  = require("mongoose");

mongoose.connect("mongodb://0.0.0.0/ecommerce")
    .then(()=>{console.log("connected to DB")})
    .catch((error)=>{console.log("failed to connected to DB")});
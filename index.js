const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
app.use(express.urlencoded());
app.use("/", require("./routes/index"));

app.listen(port , (error)=>{
    if(error)
    {
        console.log("error in server");
        return;
    }
    console.log("server is up and running ");
});
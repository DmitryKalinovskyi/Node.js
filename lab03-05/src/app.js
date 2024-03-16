require('dotenv').config();
const mongoose = require("../db/mongooseContext");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

mongoose.connection.once("connected", onConnection);

function onConnection(){
    console.log("Connected. Setup routers");
    app.use(require('./routers/user'));
    app.use(require('./routers/task'));

    app.listen(3000, "127.0.0.1", () => {
        console.log("Task manager api listening in port 3000...");
    });
}






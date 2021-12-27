const express = require("express");
const mongoose = require("mongoose");
const HolderRouter = require("./router/CardHolderRouter");
const StationRouter = require("./router/StationRouter");


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/card', HolderRouter);
app.use('/station', StationRouter);
app.use(function (req, res) {
    res.status(404).send("Not Found")
})

mongoose.connect("mongodb://localhost:27017/metro-sys")
    .then(() => {
        app.listen(4000)
    })
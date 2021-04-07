"use strict";


// 모듈
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// 라우팅
const routes = require("./src/routes");
app.use("/", routes);

// app.get("/", (req, res) => {
//   res.render("parking", { data: "00" });
// })


app.listen(port, () => {
  console.log("Server Start!")
})

module.exports = app;

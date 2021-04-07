'use strict';
// 라우터

const express = require("express");
const router = express.Router();
const ctrl = require("./ctrl");



router.get("/", (req, res) => {
  res.render("parking", { data: "00" });
});


router.post("/insert", ctrl.process.insert);



module.exports = router;
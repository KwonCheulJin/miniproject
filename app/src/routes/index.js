"use strict";

// 라우터

const express = require("express");
const router = express.Router();
const ctrl = require("./ctrl");


router.get("/", ctrl.output.insert);

router.post("/insert", ctrl.process.insert);
router.post("/signup", ctrl.process.signUp);
router.post("/out", ctrl.process.outCar);
router.post("/discount", ctrl.process.discount);



module.exports = router;
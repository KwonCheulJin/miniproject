"use strict";

// 라우터

const express = require("express");
const router = express.Router();
const ctrl = require("./ctrl");


router.get("/", ctrl.output.insert);

router.post("/insert", ctrl.process.insert);
router.post("/seasoninsert", ctrl.process.seasonInsert);
router.post("/signup", ctrl.process.signUp);
router.post("/outcarinfo", ctrl.process.outCarInfo);
router.post("/outseasoncarinfo", ctrl.process.outSeasonCarInfo);
router.post("/discount", ctrl.process.discount);
router.post("/paymentcash", ctrl.process.paymentCashSave);
router.post("/paymentcard", ctrl.process.paymentCardSave);



module.exports = router;
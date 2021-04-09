'use strict';

const moment = require("moment");

// 컨트롤러

const output = {
  insert: (req, res) => {
    res.render("parking");
  }
};



const process = {
  insert: (req, res) => {
    console.log(req.body.carNumber)
    console.log(moment(req.body.dateTime).format("YYYY-MM-DD HH:mm:ss"))
    if (req.body) {
      return res.json({
        success: true
      });
    }
  },
  signup: (req, res) => {
    console.log(req.body.seasonCarNumber)
    console.log(req.body.seasonName)
    console.log(moment(req.body.seasonPeriod).format("YYYY-MM-DD"))
    if (req.body) {
      return res.json({
        success: true
      });
    }
  },
  outCar: (req, res) => {
    console.log(req.body.outCarNum)
    console.log(moment(req.body.outTime).format("YYYY-MM-DD HH:mm:ss"))
    if (req.body) {
      return res.json({
        success: true
      });
    }
  },
  discount: (req, res) => {
    console.log(req.body)
    if (req.body) {
      return res.json({
        success: true
      });
    }
  },
};

module.exports = {
  output,
  process,
}
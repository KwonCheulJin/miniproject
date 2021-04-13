'use strict';

const moment = require("moment");
const User = require('../models/User');
// 컨트롤러

const output = {
  insert: (req, res) => {
    res.render("parking");
  }
};


const process = {
  // ------ 주차장 입구 등록 ------
  insert: async (req, res) => {
    const user = new User(req.body);
    const response = await user.insert();
    console.log(response);
    return res.json(response);
  },
  // ------ 주차장 입구 정기권 확인 ------
  seasonInsert: async (req, res) => {
    const user = new User(req.body);
    const response = await user.seasonInsert();
    console.log(response);
    return res.json(response);
  },
  // ------ 정기권 등록 ----------
  signUp: async (req, res) => {
    const user = new User(req.body);
    const response = await user.signUp();
    console.log(response);
    return res.json(response);
  },
  // ------ 출차차량 정보전달 -------
  outCarInfo: async (req, res) => {
    const user = new User(req.body);
    const response = await user.outCarInfo();
    console.log(response);
    return res.json(response);
  },
  // ------ 정기권출차차량 정보전달 -------
  outSeasonCarInfo: async (req, res) => {
    const user = new User(req.body);
    const response = await user.outSeasonCarInfo();
    console.log(response);
    return res.json(response);
  },
  // ------ 할인코드 ----------
  discount: async (req, res) => {
    const user = new User(req.body);
    const response = await user.discount();
    console.log(response);
    return res.json(response);
  },

  paymentCashSave: async (req, res) => {
    const user = new User(req.body);
    const response = await user.paymentCashSave();
    console.log(response);
    return res.json(response);
  },

  paymentCardSave: async (req, res) => {
    const user = new User(req.body);
    const response = await user.paymentCardSave();
    console.log(response);
    return res.json(response);
  },

};

module.exports = {
  output,
  process,
}
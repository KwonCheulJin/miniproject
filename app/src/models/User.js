"use strict";

const db = require("../config/db");
const UserStorage = require("./UserStorage");
const moment = require("moment");


class User {
  constructor(body) {
    this.body = body;
  }

  async insert() {
    const client = this.body
    // console.log(client, "client")
    try {
      const carNum = client.carNum
      const inTime = moment(client.inTime).format("YYYY-MM-DD HH:mm:ss")
      console.log(inTime);
      const response = await UserStorage.insert(client);
      const re = /[가-힣]{2}[\s]*[0-9]{2,3}[\s]*[가-힣]{1}[\s]*[0-9]{4}/gi;
      const re2 = /[0-9]{2,3}[\s]*[가-힣]{1}[\s]*[0-9]{4}/gi;
      if (carNum === "") {
        return { empty: true, emptyMsg: "사용자를 등록해주세요" };
      } else if (!re2.test(carNum) && !re.test(carNum)) {
        return { carNumForm: true, msg: "차량번호형식이 아닙니다." };
      } return response;
    } catch (err) {
      return { success: false, msg: err }
    }
  }

  async seasonInsert() {
    const client = this.body
    // console.log(client, "client")
    try {
      const carNum = client.carNum
      const { season_car_number, use_period } = await UserStorage.seasonInsert(carNum);
      console.log(season_car_number, use_period, "userinfo");
      const re = /[가-힣]{2}[\s]*[0-9]{2,3}[\s]*[가-힣]{1}[\s]*[0-9]{4}/gi;
      const re2 = /[0-9]{2,3}[\s]*[가-힣]{1}[\s]*[0-9]{4}/gi;
      if (carNum === "") {
        return { empty: true, emptyMsg: "사용자를 등록해주세요" };
      } else if (!re2.test(carNum) && !re.test(carNum)) {
        return { carNumForm: true, msg: "차량번호형식이 아닙니다." };
      } else if (carNum === season_car_number) {
        return { season: true, msg: `정기권 ${carNum}님 반갑습니다. 이용가능기간은 ${moment(use_period).format("YYYY-MM-DD")}까지 입니다.` };
      }
    } catch (err) {
      return { success: false, msg: err }
    }
  }

  async signUp() {
    const client = this.body;
    try {
      const response = await UserStorage.signUp(client);
      // console.log(response)
      return response;
    } catch (err) {
      return { success: false, msg: err }
    }
  }

  async outCarInfo() {
    const client = this.body
    console.log(client, "user carinfo")
    try {
      const response = await UserStorage.outCarInfo(client);
      return response;
    } catch (err) {
      return { success: false, msg: err }
    }
  }

  async outSeasonCarInfo() {
    const client = this.body
    // console.log(client, "client")
    try {
      const carNum = client.carNum
      const { season_car_number, use_period } = await UserStorage.outSeasonCarInfo(carNum);
      console.log(season_car_number, use_period, "userinfo");
      return { season: true, msg: `정기권 ${carNum}님 안녕히 가십시오. 이용가능기간은 ${moment(use_period).format("YYYY-MM-DD")}까지 입니다.` };
    } catch (err) {
      return { success: false, msg: err }
    }
  }

  async discount() {
    const client = this.body
    console.log(client, "DC");
    try {
      const codeValue = client.dcSelect;
      const { in_time, out_time } = await UserStorage.discount(client);
      const resultMinute = moment(out_time).diff(moment(in_time), 'minutes')
      console.log(resultMinute);
      // // ---- 주차 요금 분당 100원 ------
      const resultAmount = resultMinute * 100
      if (codeValue === "nationalMerit") {
        const DC = resultAmount * (1 / 5)
        if (Math.sign(DC) < 0) {
          return { merit: true, result: "0원" }
        }
        return { merit: true, result: `${DC}원` }
      } else if (codeValue === "disablePerson") {
        const DC = resultAmount * (1 / 5)
        if (Math.sign(DC) < 0) {
          return { person: true, result: "0원" }
        }
        return { person: true, result: `${DC}원` }
      } else if (codeValue === "transfer") {
        const DC = resultAmount * (1 / 2)
        if (Math.sign(DC) < 0) {
          return { transfer: true, result: "0원" }
        }
        return { transfer: true, result: `${DC}원` }
      } else if (codeValue === "market") {
        const DC = resultAmount * (1 / 4)
        if (Math.sign(DC) < 0) {
          return { market: true, result: "0원" }
        }
        return { market: true, result: `${DC}원` }
      } else {
        if (Math.sign(resultAmount) < 0) {
          return { success: true, result: "0원" }
        }
        return { success: true, result: `${resultAmount}원` };
      }
    } catch (err) {
      return { success: false, msg: err }
    }
  }

  async paymentCashSave() {
    const client = this.body
    console.log(client, "cash")
    try {
      const response = await UserStorage.paymentCashSave(client);
      return response;
    } catch (err) {
      return { success: false, msg: err }
    }
  }

  async paymentCardSave() {
    const client = this.body
    console.log(client, "card")
    try {
      const response = await UserStorage.paymentCardSave(client);
      return response;
    } catch (err) {
      return { success: false, msg: err }
    }
  }
}





module.exports = User;

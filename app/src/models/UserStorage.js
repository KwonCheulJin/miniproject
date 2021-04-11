"use strict";

// const db = require("../config/db");
const fs = require("fs").promises;
const moment = require("moment");

class UserStorage {

  // ------ 회원가입 ----------
  static #getSeasonUserInfo(data, seasonCarNum) {
    const users = JSON.parse(data);
    const idx = users.seasonCarNum.indexOf(seasonCarNum);
    const usersKeys = Object.keys(users);
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});
    return userInfo;
  }

  static #getSeasonUsers(data, isAll, fields) {
    const users = JSON.parse(data);
    if (isAll) return users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  static getSeasonUsers(isAll, ...fields) {
    return fs
      .readFile("./src/databases/seasonusers.json")
      .then((data) => {
        return this.#getSeasonUsers(data, isAll, fields);
      })
      .catch(console.error);
  }

  static getSeasonUserInfo(seasonCarNum) {
    return fs
      .readFile("./src/databases/seasonusers.json")
      .then((data) => {
        return this.#getSeasonUserInfo(data, seasonCarNum);
      })
      .catch(console.error);
  }

  static async signUp(seasonUserInfo) {
    const users = await this.getSeasonUsers(true);
    const seasonCarNum = seasonUserInfo.seasonCarNum
    const seasonUserName = seasonUserInfo.seasonUserName
    const seasonPeriod = seasonUserInfo.seasonPeriod
    const re = /[가-힣]{2}[\s]*[0-9]{2,3}[\s]*[가~힣]{1}[\s]*[0-9]{4}/gi;
    const re2 = /[0-9]{2,3}[\s]*[가~힣]{1}[\s]*[0-9]{4}/gi;
    if (seasonCarNum === "") {
      throw "차량을 등록하세요";
    } else if (!re2.test(seasonCarNum) && !re.test(seasonCarNum)) {
      throw "차량번호형식이 아닙니다.";
    } else if (seasonUserName === "") {
      throw "이름을 등록하세요";
    } else if (seasonPeriod === "") {
      throw "기간을 선택하세요";
    } else if (users.seasonCarNum.includes(seasonCarNum)) {
      throw "이미 등록된차량입니다."
    }
    users.seasonCarNum.push(seasonCarNum);
    users.seasonUserName.push(seasonUserName);
    users.seasonPeriod.push(seasonPeriod);
    fs.writeFile("./src/databases/seasonusers.json", JSON.stringify(users));
    return { success: true };
  }

  // ------ 신규 이용자 ----------

  static #getUsers(data, isAll, fields) {
    const users = JSON.parse(data);
    if (isAll) return users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  static #getUserInfo(data, carNum) {
    const users = JSON.parse(data);
    const idx = users.carNum.indexOf(carNum);
    const usersKeys = Object.keys(users);
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});
    return userInfo;
  }

  static getUsers(isAll, ...fields) {
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUsers(data, isAll, fields);
      })
      .catch(console.error);
  }

  static getUserInfo(carNum) {
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUserInfo(data, carNum);
      })
      .catch(console.error);
  }

  static async insert(UserInfo) {
    const users = await this.getUsers(true);
    const carNum = UserInfo.carNum
    const inTime = UserInfo.inTime
    const re = /[가-힣]{2}[\s]*[0-9]{2,3}[\s]*[가~힣]{1}[\s]*[0-9]{4}/gi;
    const re2 = /[0-9]{2,3}[\s]*[가~힣]{1}[\s]*[0-9]{4}/gi;
    const { seasonCarNum, seasonPeriod } = await this.getSeasonUserInfo(carNum);
    console.log(carNum)
    if (carNum === "") {
      return { empty: true, emptyMsg: "사용자를 등록해주세요" };
    } else if (!re2.test(carNum) && !re.test(carNum)) {
      return { carNumForm: true, msg: "차량번호형식이 아닙니다." };
    } else if (seasonCarNum === carNum) {
      return { season: true, msg: `정기권 ${carNum}님 반갑습니다. 이용가능기간은 ${seasonPeriod}까지 입니다.`, seasonCarNum: seasonCarNum };
    }
    users.carNum.push(carNum);
    users.inTime.push(moment(inTime).format("YYYY-MM-DD HH:mm:ss"));
    fs.writeFile("./src/databases/users.json", JSON.stringify(users));
    return { success: true, msg: `환영합니다. ${carNum}님 입장하였습니다.`, carNum: `${carNum}` };
  }

  // -------- 주차장 출구 구간 ------------
  static async outCar(UserInfo) {
    const users = await this.getUsers(true);
    const carNum = UserInfo.carNum
    const outTime = UserInfo.outTime
    console.log(carNum, outTime)
    const { seasonCarNum, seasonPeriod } = await this.getSeasonUserInfo(carNum);
    if (seasonCarNum === carNum) {
      return { season: true, msg: `정기권 ${carNum}님 이용해 주셔서 감사합니다. 이용가능기간은 ${seasonPeriod}까지 입니다.` };
    }
    users.outTime.push(moment(outTime).format("YYYY-MM-DD HH:mm:ss"));
    fs.writeFile("./src/databases/users.json", JSON.stringify(users));
    return { success: true };
  }

  // -------- 할인 코드 입력------------

  static async discount(code) {
    const codeValue = code.dcSelect
    const codeCarNum = code.carNum
    console.log(codeCarNum)
    const { inTime, outTime } = await this.getUserInfo(codeCarNum);
    const resultMinute = moment(outTime).diff(moment(inTime), 'minutes')
    console.log(resultMinute);
    // ---- 주차 요금 분당 100원 ------
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
  }
}


module.exports = UserStorage;
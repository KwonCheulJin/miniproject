"use strict";

const db = require("../config/db");
const moment = require("moment");

class UserStorage {

  // ------ 회원가입 ----------

  static async signUp(seasonUserInfo) {
    // console.log(seasonUserInfo, "info")
    const seasonCarNum = seasonUserInfo.seasonCarNum,
      seasonUserName = seasonUserInfo.seasonUserName,
      seasonUsePeriod = seasonUserInfo.seasonPeriod;
    // console.log(seasonCarNum, seasonUsePeriod, "season")
    const re = /[가-힣]{2}[\s]*[0-9]{2,3}[\s]*[가-힣]{1}[\s]*[0-9]{4}/gi;
    const re2 = /[0-9]{2,3}[\s]*[가-힣]{1}[\s]*[0-9]{4}/gi;
    if (seasonCarNum === '') {
      throw "차량번호를 입력하세요";
    } else if (!re2.test(seasonCarNum) && !re.test(seasonCarNum)) {
      throw "차량번호형식이 아닙니다.";
    } else if (seasonUserName === "") {
      throw "이름을 입력하세요";
    } else if (seasonUsePeriod === "") {
      throw "기간을 등록하세요";
    } else {
      return new Promise((resolve, reject) => {
        const query = "INSERT INTO season_ticket_users (season_car_number, season_user_name, use_period)VALUES(?, ?, ?);";
        db.query(
          query,
          [seasonCarNum, seasonUserName, seasonUsePeriod],
          (err) => {
            if (err) reject("사용중인 차량번호 입니다.");
            resolve({ success: true })
          })
      })
    }
  }


  // ------ 신규 이용자 입차 ----------

  static async insert(UserInfo) {
    const carNum = UserInfo.carNum;
    const inTime = moment(UserInfo.inTime).format("YYYY-MM-DD HH:mm:ss");
    console.log(carNum, inTime, "insert");
    return new Promise((resolve, reject) => {
      // console.log(seasonCarNum, "여기2")
      const query = "INSERT INTO users (car_number, in_time)VALUES(?, ?);";
      db.query(
        query,
        [carNum, inTime],
        (err) => {
          if (err) reject("현재 이용중인 차량입니다.");
          resolve({ success: true, msg: `환영합니다. ${carNum}님 반갑습니다. 입장시간은 ${inTime} 입니다.` })
        })
    })
  }

  // ------ 정기권 이용자 입차 ----------

  static async seasonInsert(UserInfo) {
    // console.log(UserInfo);
    return new Promise((resolve, reject) => {
      // console.log(seasonCarNum, "여기")
      const query = "SELECT season_car_number, use_period FROM season_ticket_users WHERE season_car_number= ?;";
      db.query(
        query,
        [UserInfo],
        (err, data) => {
          if (err) reject(console.log(err))
          resolve(data[0]);
        });
    });
  }

  // -------- 주차장 출구 구간 ------------
  static async outCarInfo(UserInfo) {
    const carNum = UserInfo.carNum;
    const outTime = moment(UserInfo.outTime).format("YYYY-MM-DD HH:mm:ss");
    console.log(carNum, outTime, "outcarinfo US");
    return new Promise((resolve, reject) => {
      // console.log(seasonCarNum, "여기")
      const query = "UPDATE users SET out_time=? WHERE car_number=?;";
      db.query(
        query,
        [outTime, carNum],
        (err) => {
          if (err) reject("정산 중 오류");
          resolve({ success: true, msg: `${outTime}` });
        });
    });
  }

  static async outSeasonCarInfo(UserInfo) {
    // console.log(UserInfo);
    return new Promise((resolve, reject) => {
      // console.log(seasonCarNum, "여기")
      const query = "SELECT season_car_number, use_period FROM season_ticket_users WHERE season_car_number= ?;";
      db.query(
        query,
        [UserInfo],
        (err, data) => {
          if (err) reject(console.log(err))
          resolve(data[0]);
        });
    });
  }

  // -------- 할인 코드 입력------------

  static async discount(code) {
    const codeValue = code.dcSelect
    const codeCarNum = code.carNum
    console.log(codeValue, codeCarNum, "DC")
    return new Promise((resolve, reject) => {
      // console.log(seasonCarNum, "여기")
      const query = "SELECT in_time, out_time FROM users WHERE car_number= ?;";
      db.query(
        query,
        [codeCarNum],
        (err, data) => {
          if (err) reject(console.log(err))
          resolve(data[0]);
        });
    });
  }
}


module.exports = UserStorage;
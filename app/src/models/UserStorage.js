"use strict";

const db = require("../config/db");

class UserStorage {
  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE id = ?;";
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        // console.log(err);
        resolve(data[0]);
        // console.log(data[0]);
      });
    });
  }

  static save(userInfo) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users(id, user_name, pw) VALUES(?, ?, ?);";
      db.query(query, [userInfo.id, userInfo.name, userInfo.pw], (err) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
}

module.exports = UserStorage;
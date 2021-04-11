"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  async insert() {
    const client = this.body
    try {
      const response = await UserStorage.insert(client);
      return response;
    } catch (err) {
      return { success: false, msg: err }
    }
  }

  async signUp() {
    const client = this.body;
    console.log(client);
    try {
      const response = await UserStorage.signUp(client);
      return response;
    } catch (err) {
      return { success: false, msg: err }
    }
  }

  async outCar() {
    const client = this.body
    try {
      const response = await UserStorage.outCar(client);
      return response;
    } catch (err) {
      return { success: false, msg: err }
    }
  }


  async discount() {
    const client = this.body
    try {
      const response = await UserStorage.discount(client);
      return response;
    } catch (err) {
      return { success: false, msg: err }
    }
  }
}





module.exports = User;

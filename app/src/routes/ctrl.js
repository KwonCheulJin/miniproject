'use strict';

// 컨트롤러

const output = {
  insert: (req, res) => {
    res.render("parking", { data: "00" });
  },

  delete: (req, res) => {
    res.render("parking");
  },

  // logout: (req, res) => {
  //   req.session.destroy((err) => {
  //     res.redirect("/login");
  //   })
  // },

  // register: (req, res) => {
  //   res.render("home/register");
  // }
};



const process = {
  insert: (req, res) => {
    console.log(req.body.carNumber);
    if (req.body) {
      return res.json({
        success: true
      });
    }
  },
  // register: async (req, res) => {
  //   const user = new User(req.body);
  //   const response = await user.register();
  //   return res.json(response);
  // },
};

module.exports = {
  output,
  process
}
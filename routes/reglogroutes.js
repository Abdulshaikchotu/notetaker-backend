const express = require("express");
const routes = express.Router();
const reglogmodel = require("../models/reglogfullnotes");
const jwt = require("jsonwebtoken");

//regster
routes.post("/register", async (req, res) => {
  try {
    let { email, password } = req.body;
    let emaildata = await reglogmodel.findOne({ email });
    if (emaildata) {
      res.json({
        status: "fail",
        msg: "user already there with given credential",
      });
    } else {
      let datas = await reglogmodel.create(req.body);
      res.json({
        status: "successfully registerd",
        credentails: datas,
      });
    }
  } catch (e) {
    res.json({
      status: "failed",
      msg: e.message,
    });
  }
});
//login
routes.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let emaildata = await reglogmodel.findOne({ email });
    console.log(emaildata);
    if (!emaildata) {
      res.json({
        status: "fail",
        msg: "user is not present with given email kindly register again",
      });
    } else {
      let token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: emaildata._id,
        },
        "abdul"
      );
      res.json({
        status: "success",
        token: token,
      });
    }
  } catch (e) {
    res.json({
      status: "failed",
      msg: e.message,
    });
  }
});
module.exports = routes;

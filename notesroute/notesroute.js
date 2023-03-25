const express = require("express");
const notesdata = require("../notesmodel/model");

const routes = express.Router();
//get all notes
routes.get("/getallnotes", async (req, res) => {
  let user = req.user;
  try {
    let notesalldata = await notesdata.find({ user }).populate("notes");
    res.json({
      status: "success",
      data: notesalldata,
    });
  } catch (e) {
    res.json({
      status: "fail",
      msg: e.message,
    });
  }
});

routes.post("/postnotes", async (req, res) => {
  let user = req.user;
  try {
    let notesalldata = await notesdata.create({
      title: req.body.title,
      description: req.body.description,
      user: user,
    });
    res.json({
      status: "success",
      data: notesalldata,
    });
  } catch (e) {
    res.json({
      status: "fail",
      msg: e.message,
    });
  }
});

//updatedata
routes.put("/putnotes/:id", async (req, res) => {
  let user = req.user;
  let notesbody = req.body;
  try {
    let updateddata = await notesdata.updateOne(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json({
      status: "success",
      author: updateddata,
      userdata: user,
    });
  } catch (e) {
    res.json({
      status: "fail",
      msg: e.message,
    });
  }
});

//deleter with particular id
routes.delete("/deletenotes/:id", async (req, res) => {
  let user = req.user;
  let notesbody = req.body;
  try {
    let deleteddata = await notesdata.deleteOne({ _id: req.params.id });

    res.json({
      status: "success",
      author: deleteddata,
    });
  } catch (e) {
    res.json({
      status: "fail",
      msg: e.message,
    });
  }
});

module.exports = routes;

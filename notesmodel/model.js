const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;

const notesschema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: ObjectId, ref: "notescollection" },
});

const model = mongoose.model("fullstacknotestakingdata", notesschema);

module.exports = model;

const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;
const fullnotesschema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  notes: [{ type: ObjectId, ref: "fullstacknotestakingdata" }],
});

const notesmodel = mongoose.model("notescollection", fullnotesschema);
module.exports = notesmodel;

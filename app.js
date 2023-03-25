const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const port = 5000;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const reglogroutes = require("./routes/reglogroutes");
let notesroute = require("./notesroute/notesroute");
app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(reglogroutes);
app.use("/successfulLogin", async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, "abdul", function (err, decoded) {
      if (err) {
        return res.json({
          status: "Fail",
          massage: "Not a valid token.",
        });
      }
      req.user = decoded.data;
      console.log("decoded data" + decoded.data);
      //   console.log(req.body);
      next();
    });
  } else {
    return res.status(401).json({
      status: "Fail",
      massage: "Token not Found",
    });
  }
});
app.use("/successfulLogin", notesroute);
mongoose
  .connect(process.env.mongodburl)
  .then(() => console.log("connected to database"));

app.listen(port, () => console.log(`server is up at${port}`));

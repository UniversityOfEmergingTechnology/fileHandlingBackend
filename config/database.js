const mongoose = require("mongoose");

require("dotenv").config();

exports.connectWithDb = async (req, res) => {
  mongoose
    .connect(process.env.DATABSE_URL, {
      useNewUrlParser: true,
    //   useUnifiedToplogy: true,
    })
    .then(() => console.log("Connection to database succesfully done"))
    .catch((err) => console.log(err.message));
};

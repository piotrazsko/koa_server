const connexionString = "mongodb://172.17.0.1:27017";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: String,
  email: String,
  picture: String,
});

const initDB = () => {
  mongoose.connect(connexionString);

  mongoose.connection.once("open", () => {
    console.log("connected to database");
  });

  mongoose.connection.on("error", console.error);
};

module.exports = initDB;

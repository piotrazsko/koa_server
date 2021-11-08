const connexionString = "mongodb://localhost:27017/test";
// const connexionString = "mongodb://172.17.0.1:27017/test";

const mongoose = require("mongoose");

const initDB = () => {
  mongoose.connect(connexionString);

  mongoose.connection.once("open", () => {
    console.log("connected to database");
  });
  mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
  );

  mongoose.connection.on("error", console.error);
};

module.exports = { initDB };

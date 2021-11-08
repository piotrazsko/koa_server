const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  first_name: String,
  last_name: String,
  data: String,
  hash: String,
  contact_phone: String,
});

const User = mongoose.model("User", UserSchema);

const getUserFromDb = async (email) => {
  const data = await User.findOne({ email: email });
  return data;
};
const getUsersFromDb = async () => {
  const data = await User.findOne({ email: email });
  return data;
};

const createUserInDb = async (user) => {
  var newUser = new User(user);
  newUser.save();
  return user;
};

module.exports = { getUserFromDb, createUserInDb };

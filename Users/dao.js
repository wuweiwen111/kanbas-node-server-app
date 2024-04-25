import model from "./model.js";
// create user
export const createUser = (user) => {
  delete user._id;
  return model.create(user);
};
// find all user
export const findAllUsers = () => {
  return model.find();
};
export const findUserById = (userId) => {
  return model.findById(userId);
};
// find user by name
export const findUserByUsername = (username) => {
  return model.findOne({ username: username });
};
// sign in
export const findUserByCredentials = (username, password) => {
  return model.findOne({ username, password });
};
// update user
export const updateUser = (userId, user) => {
  return model.updateOne({ _id: userId }, { $set: user });
};
// delete user
export const deleteUser = (userId) => {
  return model.deleteOne({ _id: userId });
};
// role
export const findUsersByRole = (role) => {
  return model.find({ role: role });
};

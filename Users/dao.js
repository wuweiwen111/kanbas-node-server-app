import model from "./model.js";
// create user
export const createUser = (user) => {
  model.create(user);
};
// find all user
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
// find user by name
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
// sign in
export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });
// update user
export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });
// delete user
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
// role
export const findUsersByRole = (role) => model.find({ role: role });

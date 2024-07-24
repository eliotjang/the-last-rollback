import User from '../classes/models/user.class.js';
import { userSession } from './sessions.js';

export const addUser = (socket, accountId) => {
  let user = getUserById(accountId);
  if (user) {
    user.socket = socket;
  } else {
    user = new User(accountId, socket);
  }
  userSession.push(user);
  return user;
};

export const removeUser = (socket) => {
  const index = userSession.findIndex((user) => user.socket === socket);
  if (index !== -1) {
    return userSession.splice(index, 1)[0];
  }
};

export const getUserById = (accountId) => {
  return userSession.find((user) => user.accountId === accountId);
};

export const getUserBySocket = (socket) => {
  return userSession.find((user) => user.socket === socket);
};
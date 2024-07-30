import { v4 as uuidv4 } from 'uuid';
import Dungeon from '../classes/models/dungeon.class.js';
import { dungeonSessions } from './sessions.js';

export const addDungeonSession = () => {
  const id = uuidv4();
  const session = new Dungeon(id);
  dungeonSessions.push(session);
  return session;
};

export const removeDungeonSession = (id) => {
  const index = dungeonSessions.findIndex((session) => session.id === id);
  if (index !== -1) {
    return dungeonSessions.splice(index, 1)[0];
  }
};

export const getDungeonSession = (id) => {
  return dungeonSessions.find((session) => session.id === id);
};

export const getDungeonSessionByUserId = (accountId) => {
  return dungeonSessions.find((session) => session.getUser(accountId));
};

export const getDungeonSessionByUserSocket = (socket) => {
  return dungeonSessions.find((session) => session.getUserBySocket(socket));
};

export const getAllDungeonSessions = () => {
  return dungeonSessions;
};
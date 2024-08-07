const dungeonConstants = {
  general: {
    MAX_USERS: 2,
    DAY_DURATION: 10000,
  },
  phases: {
    STANDBY: 3,
    DAY: 5,
    DAY_STARTED: 6,
    NIGHT: 8,
    RESULT: 10,
    ENDING: 15,
  },
};

export const attackTypes = {
  NORMAL: 0,
  SKILL: 1,
};

export default dungeonConstants;

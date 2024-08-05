import { stringToCamelCase, stringToPascalCase } from '../utils/transform-case.utils.js';

const PROTOCOL_PREFIX = 'Google.Protobuf.Protocol.';
const PACKET_SUFFIX = 'Packet';

export const headerConstants = {
  // bytes
  TOTAL_LENGTH: 4,
  PACKET_TYPE_LENGTH: 1,
};

export const packetTypes = {
  PING: 1,
  REQUEST: 2,
  RESPONSE: 3,
  NOTIFICATION: 4,
};

export const payloadTypes = {
  C_ENTER: 1,
  S_ENTER: 2,
  S_SPAWN: 3,
  S_DESPAWN: 5, // 나 빼고 모두
  C_MOVE: 6,
  S_MOVE: 7, // 모두
  C_ANIMATION: 8,
  S_ANIMATION: 9, // 모두
  C_CHAT: 12,
  S_CHAT: 13, // noti

  C_PLAYER_RESPONSE: 15,

  S_SCREEN_TEXT: 18,
  S_SCREEN_DONE: 19,
  S_BATTLE_LOG: 20,
  S_SET_PLAYER_HP: 21,
  S_SET_PLAYER_MP: 22,
  S_SET_MONSTER_HP: 23,
  S_PLAYER_ACTION: 24,
  S_MONSTER_ACTION: 25,
  C_SIGN_UP: 26,
  S_SIGN_UP: 27,
  C_LOG_IN: 28,
  S_LOG_IN: 29,
  C_PLAYER_ATTACK: 40,
  S_PLAYER_ATTACK: 41,
  C_MONSTER_ATTACKED: 42,
  S_MONSTER_ATTACKED: 43,
  C_MONSTER_ATTACK: 44,
  S_PLAYER_ATTACKED: 45,

  C_ANIMATION_PLAYER: 46,
  S_ANIMATION_PLAYER: 47,
  C_ANIMATION_MONSTER: 48,
  S_ANIMATION_MONSTER: 49,

  C_MONSTER_MOVE: 60,
  S_MONSTER_MOVE: 61,

  C_DUNGEON_MATCH: 100,
  S_DUNGEON_MATCH: 101,
  S_ENTER_DUNGEON: 104,
  S_LEAVE_DUNGEON: 105,
  C_DUNGEON_SCENE_READY: 106,
  C_DAY_ROUND_READY: 107,
  S_DAY_ROUND_READY: 108,
  S_DAY_ROUND_TIMER: 109,
  S_NIGHT_ROUND_START: 110,
  S_NIGHT_ROUND_END: 111,

  C_TOWER_ATTACKED: 130,
  S_TOWER_ATTACKED: 131,

  S_SOME_NOTIFICATION: 300,
};

export const packetNames = Object.fromEntries(
  Object.entries(packetTypes).map(([key, value]) => {
    const str = PROTOCOL_PREFIX + stringToPascalCase(key) + PACKET_SUFFIX;
    return [value, str];
  }),
);

export const payloadNames = Object.fromEntries(
  Object.entries(payloadTypes).map(([key, value]) => {
    const str = PROTOCOL_PREFIX + key.substring(0, 2) + stringToPascalCase(key.substring(2));
    return [value, str];
  }),
);

/**
 * @deprecated
 */
export const typeMappings = Object.fromEntries(
  Object.entries(payloadTypes).map(([key, value]) => {
    if (key.charAt(0) === 'S') {
      if (key.endsWith('NOTIFICATION')) {
        return [value, packetTypes.NOTIFICATION];
      }
      return [value, packetTypes.RESPONSE];
    }
    return [value, packetTypes.REQUEST];
  }),
);

export const payloadKeyToTypes = {};

export const payloadKeyNames = Object.fromEntries(
  Object.entries(payloadTypes).map(([key, value]) => {
    const payloadKey = stringToCamelCase(key);
    payloadKeyToTypes[payloadKey] = value;
    return [value, payloadKey];
  }),
);

/**
 *
 * @param {number} payloadType payloadTypes에 매핑된 타입
 * @returns payloadType에 맞는 Message 이름 반환
 */
export const getPayloadNameByPayloadType = (payloadType) => {
  if (Object.values(payloadNames).includes(payloadType)) {
    return payloadNames[payloadType];
  }
  return null;
};

import { payloadTypes } from '../constants/packet.constants.js';
import CustomError from '../utils/error/customError.js';
import { ErrorCodes } from '../utils/error/errorCodes.js';
import locationUpdateHandler from './game/locationUpdate.handler.js';
import enterTownHandler from './town/enter-town.handler.js';
import loginAccountHandler from './account/login-account.handler.js';
import signupAccountHandler from './account/signup-account.handler.js';
import monsterMoveHandler from './dungeon/monster-move.handler.js';

const handlers = {
  [payloadTypes.C_ENTER]: enterTownHandler,
  [payloadTypes.C_SIGN_UP]: signupAccountHandler,
  [payloadTypes.C_LOG_IN]: loginAccountHandler,
  [payloadTypes.C_MOVE]: locationUpdateHandler,
  [payloadTypes.C_MONSTER_MOVE]: monsterMoveHandler,
};

export const getHandlerByPayloadType = (payloadType) => {
  if (!handlers[payloadType]) {
    throw new CustomError(
      ErrorCodes.UNKNOWN_HANDLER_ID,
      `핸들러를 찾을 수 없습니다: ID ${payloadType}`,
    );
  }
  return handlers[payloadType];
};

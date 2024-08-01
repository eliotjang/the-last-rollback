import { payloadTypes } from '../../constants/packet.constants.js';
import { getTownSessionByUserSocket } from '../../session/town.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { handleError } from '../../utils/error/errorHandler.js';

const chattingHandler = ({ socket, userId, packet }) => {
  try {
    const { playerId, chatMsg } = packet;
    const townSession = getTownSessionByUserSocket(socket);

    if (!townSession) {
      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, '타운 세션을 찾을 수 없습니다.');
    }

    const user = townSession.getUserBySocket(socket);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
    }

    const data = { playerId: playerId, chatMsg };
    //const TransformInfos = townSession.getAllLocation(user.playerInfo.playerId);

    townSession.sendPacketToAll(payloadTypes.S_CHAT, data);
  } catch (error) {
    handleError(socket, error);
  }
};

export default chattingHandler;
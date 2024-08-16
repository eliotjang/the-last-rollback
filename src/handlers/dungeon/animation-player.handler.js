import { getUserById } from '../../session/user.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { handleError } from '../../utils/error/errorHandler.js';

const animationPlayerHandler = ({ socket, accountId, packet }) => {
  // C_ANIMATION_PLAYER
  try {
    const { animCode, monsterIdx } = packet;
    const user = getUserById(accountId);
    const dungeonSession = user.getSession();
    if (!dungeonSession) {
      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, 'Dungeon Session을 찾을 수 없습니다.');
    }

    dungeonSession.animationPlayer(animCode, accountId, monsterIdx);
  } catch (e) {
    handleError(e);
  }
};

export default animationPlayerHandler;

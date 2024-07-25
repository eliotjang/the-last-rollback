import { packetTypes, payloadTypes } from '../../constants/packet.constants.js';
import { findUserByAccountID, updateUserLogin } from '../../db/user/user.db.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes, SuccessCode } from '../../utils/error/errorCodes.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { serialize } from '../../utils/packet-serializer.utils.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../../config/config.js';
import { addUser } from '../../session/user.session.js';

const loginAccountHandler = async ({ socket, userId, packet }) => {
  try {
    const { accountId, accountPwd } = packet;

    const userDB = await findUserByAccountID(accountId);
    // if (!userDB || !(await bcrypt.compare(accountPwd, userDB.accountPwd))) {
    //   const responsePacket = serialize(packetTypes.S_LOGIN, {
    //     code: ErrorCodes.USER_NOT_FOUND,
    //     msg: '유효하지 않은 계정입니다.',
    //   });
    //   socket.write(responsePacket);
    //   throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유효하지 않은 계정입니다.');
    // }

    const token = jwt.sign(accountId, config.account.jwtSecret);
    socket.token = token;
    // socket.accountId = userDB.accountId;

    await updateUserLogin(accountId);

    addUser(socket, accountId);

    const payload = {
      accountId,
      accountPwd,
    };

    socket.sendResponse(SuccessCode.Success, '계정 로그인 성공', payloadTypes.S_LOG_IN, payload);
  } catch (error) {
    handleError(socket, error);
  }
};

export default loginAccountHandler;
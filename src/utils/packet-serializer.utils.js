import { getPacketNameByPacketType } from '../constants/packet.constants.js';
import { getProtoMessage } from '../init/proto.init.js';
import { writeHeader } from './packet-header.utils.js';

/**
 *
 * @param {number} packetType packetTypes에 매핑된 패킷 타입
 * @param {object} data 직렬화할 데이터
 * @param {boolean} withoutHeader 비워둘 시 직렬화 시 헤더를 자동으로 추가, true 시 헤더 없이 반환
 * @returns 버퍼 바이트 배열 반환
 */
export const serialize = (packetType, data, withoutHeader) => {
  const payloadKey = getPacketNameByPacketType(packetType);
  if (!payloadKey) {
    throw new Error(`직렬화 에러: 잘 못된 packetType ${packetType}`);
  }

  const keyName = getPacketNameByPacketType(packetType);
  data[keyName] = data.payload;
  data.payload = null;

  const MessageType = getProtoMessage();
  const msg = MessageType.verify(data);
  if (msg) {
    throw new Error('직렬화 에러:', msg);
  }
  const encoded = MessageType.encode(data).finish();
  if (withoutHeader) {
    return encoded;
  }
  const header = writeHeader(encoded.length, packetType);
  return Buffer.concat([header, encoded]);
};

/**
 *
 * @param {Bytes} data
 * @returns decoded data
 */
export const deserialize = (data) => {
  const MessageType = getProtoMessage();
  const decoded = MessageType.decode(data);

  return decoded;
};

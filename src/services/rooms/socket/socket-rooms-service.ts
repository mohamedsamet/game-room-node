import { roomService } from '../http/room.service';
import SocketIO from 'socket.io';
import { GET_ROOMS } from '../../../constants/socket-events';

function emitRooms(event: SocketIO.Server) {
  event.emit(GET_ROOMS, {data: roomService.getRoomsFirstPage()});
}
const socketRoomsService = {emitRooms}

export {socketRoomsService}

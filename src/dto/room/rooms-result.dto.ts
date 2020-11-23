import { RoomDto } from './room.dto';

export interface RoomsResultDto {
  rooms: RoomDto[];
  total: number;
}

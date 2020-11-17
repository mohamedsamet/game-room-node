import { BcryptDto } from './bcrypt.dto';

export interface UserDto {
  pseudo: string;
  hash?: BcryptDto;
}

import bcrypt from 'bcryptjs';
import { BcryptDto } from '../dto/user/bcrypt.dto';

function hashPseudo(pseudo: string): BcryptDto {
  return bcrypt.hashSync(pseudo, 10);
}

const bcryptService = {hashPseudo};
export {bcryptService};

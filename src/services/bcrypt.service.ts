import bcrypt from 'bcryptjs';

function hashPseudo(pseudo: string): string {
  return bcrypt.hashSync(pseudo, 10);
}

const bcryptService = {hashPseudo};
export {bcryptService};

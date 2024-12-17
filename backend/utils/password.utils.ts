import crypto from 'crypto';

export const hashPassword = (password: string): string => {
    return crypto.createHash('sha512').update(password).digest('hex'); // on hash le mot de passe
};

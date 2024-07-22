import jwt from 'jsonwebtoken';

export const makeJwtService = (secret: string) => ({
  createToken: (payload: object) => {
    const oneDay = '1 day';
    return jwt.sign(payload, secret, {
      expiresIn: oneDay,
    });
  },
  verifyToken: (token: string) => {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      console.info((error as Error).message);
      throw error;
    }
  },
});

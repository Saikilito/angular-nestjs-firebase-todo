import jwt from 'jsonwebtoken';

export const makeJwtService = (secret: string) => ({
  createToken: (payload: object) => {
    const oneDay = '2 days';
    console.info('create with: ', { secret });
    return jwt.sign(payload, secret, {
      expiresIn: oneDay,
    });
  },
  verifyToken: (token: string) => {
    try {
      console.info('VERIFY:', token, secret);
      return jwt.verify(token, secret);
    } catch (error) {
      console.error(error);
      console.info((error as Error).message);
      throw error;
    }
  },
});

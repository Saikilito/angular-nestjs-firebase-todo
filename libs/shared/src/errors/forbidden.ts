import { HTTP_STATUS_CODE } from '../constants';
import { CustomError } from './custom-error';

export class ForbiddenError extends CustomError<typeof ForbiddenError.CODE> {
  static CODE = 'FORBIDDEN_ERROR';

  private constructor(msg: string, path = 'Unknown path error') {
    super(ForbiddenError.CODE, msg, HTTP_STATUS_CODE.UNAUTHORIZED, path);
  }

  static create(msg: string, path = 'Unknown path error'): ForbiddenError {
    return new ForbiddenError(msg, path);
  }
}

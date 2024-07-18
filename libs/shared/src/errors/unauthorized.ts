import { HTTP_STATUS_CODE } from '../constants';
import { CustomError } from './custom-error';

export class UnauthorizeError extends CustomError<
  typeof UnauthorizeError.CODE
> {
  static CODE = 'UNAUTHORIZE_ERROR';

  private constructor(msg: string, path = 'Unknown path error') {
    super(UnauthorizeError.CODE, msg, HTTP_STATUS_CODE.UNAUTHORIZED, path);
  }

  static create(msg: string, path = 'Unknown path error'): UnauthorizeError {
    return new UnauthorizeError(msg, path);
  }
}

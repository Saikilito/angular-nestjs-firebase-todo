import { CustomError } from './custom-error';
import { HTTP_STATUS_CODE } from '../constants';

export class BadRequestError extends CustomError<typeof BadRequestError.CODE> {
  static CODE = 'BAD_REQUEST_ERROR';

  private constructor(
    msg: string,
    path: string | string[] = 'Unknown path error'
  ) {
    super(BadRequestError.CODE, msg, HTTP_STATUS_CODE.BAD_REQUEST, path);
  }

  static create(
    msg: string,
    path: string | string[] = 'Unknown path error'
  ): BadRequestError {
    return new BadRequestError(msg, path);
  }
}

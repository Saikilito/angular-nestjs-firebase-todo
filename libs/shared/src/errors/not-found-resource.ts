import { CustomError } from './custom-error';
import { HTTP_STATUS_CODE } from '../constants';

export class NotFoundResourceError extends CustomError<
  typeof NotFoundResourceError.CODE
> {
  static CODE = 'NOT_FOUND_RESOURCE_ERROR';

  private constructor(msg: string, path = 'Unknown path error') {
    super(NotFoundResourceError.CODE, msg, HTTP_STATUS_CODE.NOT_FOUND, path);
  }

  static create(
    msg: string,
    path = 'Unknown path error'
  ): NotFoundResourceError {
    return new NotFoundResourceError(msg, path);
  }
}

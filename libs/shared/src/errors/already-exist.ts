import { HTTP_STATUS_CODE } from '../constants';
import { CustomError } from './custom-error';

export class AlreadyExistError extends CustomError<
  typeof AlreadyExistError.CODE
> {
  static CODE = 'ALREADY_EXIST_RESOURCE_ERROR';

  private constructor(msg: string, path = 'Unknown path error') {
    super(AlreadyExistError.CODE, msg, HTTP_STATUS_CODE.CONFLICT, path);
  }

  static create(msg: string, path = 'Unknown path error'): AlreadyExistError {
    return new AlreadyExistError(msg, path);
  }
}

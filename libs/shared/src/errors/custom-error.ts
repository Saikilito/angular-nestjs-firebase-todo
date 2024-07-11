export type ObjectError = {
  ok: boolean;
  code: string;
  path?: string | string[] | null;
  message: string;
  statusCode: number;
  issuedAt: string;
};

export abstract class CustomError<C extends string> extends Error {
  public statusCode: number;
  public path: string | string[] | null;
  public issuedAt: Date;
  public code: C;

  constructor(
    code: C,
    message: string,
    statusCode = 500,
    path: string | string[]
  ) {
    super(message);
    this.path = path;
    this.code = code;
    this.message = message;
    this.issuedAt = new Date();
    this.statusCode = statusCode;
  }

  toJSON(): ObjectError {
    return {
      ok: false,
      code: this.code,
      path: this.path,
      message: this.message,
      statusCode: this.statusCode,
      issuedAt: this.issuedAt.toISOString(),
    };
  }
}

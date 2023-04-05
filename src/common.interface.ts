export interface NestHttp<T> {
  statusCode: number;
  message: string | null;
  data: T;
}

export enum HttpCode {
  Unautorized,
  CommonError,
  Created,
  Success,
}

export function Http<T>({
  http,
  message,
  data,
}: {
  http: HttpCode;
  message: string | null;
  data: T | null;
}): NestHttp<T> {
  switch (http) {
    case HttpCode.CommonError:
      return {
        statusCode: 400,
        message: message ? message : null,
        data: data ? data : null,
      };
    case HttpCode.Unautorized:
      return {
        statusCode: 401,
        message: message ? message : null,
        data: data ? data : null,
      };
    case HttpCode.Created:
      return {
        statusCode: 201,
        message: message ? message : null,
        data: data ? data : null,
      };
    case HttpCode.Success:
      return {
        statusCode: 200,
        message: message ? message : null,
        data: data ? data : null,
      };
    default:
      return {
        statusCode: 400,
        message: message ? message : null,
        data: data ? data : null,
      };
  }
}

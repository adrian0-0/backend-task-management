export class ResponseDto<T> {
  statusCode: number;
  message?: string;
  data?: T;

  constructor({ data, statusCode, message }: IResponse<T>) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

interface IResponse<T> {
  message?: string;
  statusCode: number;
  data?: T;
}

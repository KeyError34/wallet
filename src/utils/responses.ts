
export class ResponseHandler {
  static success(
    res: any,
    data: any,
    message: string,
    statusCode: number = 200
  ): void {
    res.status(statusCode).json({
      status: 'success',
      message: message,
      data: data,
    });
  }

  static error(res: any, message: string, statusCode: number = 400): void {
    res.status(statusCode).json({
      status: 'error',
      message: message,
    });
  }
}

import { Response } from 'express';

export class HttpResponse {
  ok(res: Response, data: unknown, status?: number): Response {
    return res.status(status ? status : 200).json({
      data,
    });
  }

  badRequest(res: Response, message: string, status?: number): Response {
    return res.status(status ? status : 400).json({
      status: status ? status : 400,
      message: message,
    });
  }

  serverError(res: Response, error: unknown, status?: number) {
    if (error instanceof Error)
      return res.status(status ? status : 500).json({
        status: status ? status : 500,
        message: error.message,
      });
    res.status(500).json({
      message: 'unknown error',
    });
  }
}

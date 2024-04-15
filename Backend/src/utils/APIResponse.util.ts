export class APIResponse {
  message: string;
  statusCode: number;
  data: any;
  success: boolean;

  constructor (message = 'This is Default Message', statusCode = 200, data: any) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data ?? null;
    this.success = statusCode < 400;
  }
}

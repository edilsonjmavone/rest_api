export class HandleError extends Error {
  status?: number;
  constructor(msg: string, status?: number) {
    super();
    this.status = status;
  }
}

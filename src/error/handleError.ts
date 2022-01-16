import { Response } from "express";

export class HandleError extends Error {
  status: number;
  constructor(msg: string, status: number = 500) {
    super();
    this.status = status;
    this.message = msg;
  }
}

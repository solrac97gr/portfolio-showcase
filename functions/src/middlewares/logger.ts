import type { Request, Response } from "express";
import * as logger from "firebase-functions/logger";

// Middleware wrappper: enforces logging for each request
const withLogging =
  (handler: (req: Request, res: Response) => void) =>
  async (req: Request, res: Response) => {
    const method = (req.method || "UNKNOWN").toUpperCase();
    const path = req.path || req.url || "-";
    const dateTime = new Date().toLocaleString();
    const body = req.body ? JSON.stringify(req.body) : "-";
    logger.info(`${method} | ${path} | ${dateTime} | ${body}`);
    return await handler(req, res);
  };
export { withLogging };

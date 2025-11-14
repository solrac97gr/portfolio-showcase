import type { Request, Response } from "express";

// Middleware wrapper: enforces allowed HTTP methods before calling the handler
const withMethodCheck =
    (allowedMethods: string[], handler: (req: Request, res: Response) => void) =>
    (req: Request, res: Response) => {
        if (!allowedMethods.includes(req.method || "")) {
            res.status(405).json({ error: "Method Not Allowed" });
            return;
        }
        return handler(req, res);
    };
export { withMethodCheck };
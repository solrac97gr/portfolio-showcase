import { onRequest } from "firebase-functions/https";
import { setGlobalOptions } from "firebase-functions";
import { withMethodCheck } from "./middlewares/method-check";
import { withLogging } from "./middlewares/logger";
import type { Request, Response } from "express";

setGlobalOptions({ maxInstances: 10 });

export const echo = onRequest(
    withLogging(
        withMethodCheck(["POST"], (req: Request, res: Response) => {
            const message = req.query.message || (req.body && req.body.message) || "Hello World!";
            res.json({ message });
        })
    )
);

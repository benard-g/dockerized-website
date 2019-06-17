import { Router, Request, Response } from "express";


export const createRouter = (): Router => {
    const router = Router();

    router.get("/", (_req: Request, res: Response) => {
        return res.status(200).json({
            message: "OK"
        });
    });

    return router;
};

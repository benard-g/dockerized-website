import { Router } from "express";

import ApiEndpointController from "./controllers/ApiEndpointController";
import AuthLocalController from "./controllers/AuthLocalController";

import asyncHandler from "./middlewares/asyncHandler";


export const createRouter = (
    apiEndpointController: ApiEndpointController,
    authLocalController: AuthLocalController
): Router => {
    const router = Router();

    router.get("/", apiEndpointController.endpoint);

    router.post("/auth/local/register", asyncHandler(authLocalController.registerUser));

    return router;
};

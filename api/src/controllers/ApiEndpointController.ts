import { Request, Response } from "express";


class ApiEndpointController {

    public readonly endpoint = (_res: Request, res: Response) => {
        res.status(200).json({
            message: "Welcome to my API !"
        });
    };
}


export default ApiEndpointController;

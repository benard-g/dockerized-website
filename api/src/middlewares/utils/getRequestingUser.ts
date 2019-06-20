import { Request } from "express";

import User from "../../models/entities/User";


function getRequestingUser(req: Request): User {
    return (<any>req).user;
}


export default getRequestingUser;

import "reflect-metadata";
import { createConnection, Connection } from "typeorm";

import Server from "./Server";
import { createRouter } from "./router";
import * as DbConfig from "./dbConfig";

import UserRepository from "./models/UserRepository";

import EmailValidator from "./validators/EmailValidator";
import NameValidator from "./validators/NameValidator";
import PasswordValidator from "./validators/PasswordValidator";

import JwtService from "./services/JwtService";
import PasswordService from "./services/PasswordService";

import * as AuthenticatedOnly from "./middlewares/authenticatedOnly";

import ApiEndpointController from "./controllers/ApiEndpointController";
import AuthLocalController from "./controllers/AuthLocalController";
import UserController from "./controllers/UserController";


function main(): void {
    const dbConfig = DbConfig.load("../ormconfig.js");

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) {
        throw new Error('Missing environment variable "JWT_SECRET_KEY"');
    }

    createConnection(dbConfig)
        .then((conn: Connection) => {
            console.info("Connected to database");

            const server = createServer(conn, jwtSecretKey);

            server.start(3000);
        });
};

function createServer(conn: Connection, jwtSecretKey: string): Server {
    // Create Repositories
    const userRepository = new UserRepository(conn);

    // Create Validators
    const emailValidator = new EmailValidator();
    const nameValidator = new NameValidator();
    const passwordValidator = new PasswordValidator();

    // Create Services
    const jwtService = new JwtService(jwtSecretKey);
    const passwordService = new PasswordService();

    // Create Controllers
    const apiEndpointController = new ApiEndpointController();
    const authLocalController = new AuthLocalController(
        userRepository,
        emailValidator,
        nameValidator,
        passwordValidator,
        passwordService,
        jwtService
    );
    const userController = new UserController();

    // Create middlwares
    const authenticatedOnlyMiddleware = AuthenticatedOnly.generateMiddleware(userRepository, jwtService);

    // Create router and server
    const router = createRouter(
        apiEndpointController,
        authLocalController,
        userController,

        authenticatedOnlyMiddleware
    );
    return new Server(router);
}


// Run only if executed directly (e.g: `node src/main.js`)
if (require.main === module) {
    main();
}

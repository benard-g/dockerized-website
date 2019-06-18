import "reflect-metadata";
import { createConnection, Connection } from "typeorm";

import Server from "./Server";
import { createRouter } from "./router";
import * as DbConfig from "./dbConfig";

import UserRepository from "./models/UserRepository";

import EmailValidator from "./validators/EmailValidator";
import NameValidator from "./validators/NameValidator";

import PasswordService from "./services/PasswordService";

import ApiEndpointController from "./controllers/ApiEndpointController";
import AuthLocalController from "./controllers/AuthLocalController";
import PasswordValidator from "./validators/PasswordValidator";


function main(): void {
    const dbConfig = DbConfig.load("../ormconfig.js");

    createConnection(dbConfig)
        .then((conn: Connection) => {
            console.info("Connected to database");

            const server = createServer(conn);

            server.start(3000);
        });
};

function createServer(conn: Connection): Server {
    // Create Repositories
    const userRepository = new UserRepository(conn);

    // Create Validators
    const emailValidator = new EmailValidator();
    const nameValidator = new NameValidator();
    const passwordValidator = new PasswordValidator();

    // Create Services
    const passwordService = new PasswordService();

    // Create Controllers
    const apiEndpointController = new ApiEndpointController();
    const authLocalController = new AuthLocalController(
        userRepository,
        emailValidator,
        nameValidator,
        passwordValidator,
        passwordService
    );

    // Create router and server
    const router = createRouter(
        apiEndpointController,
        authLocalController
    );
    return new Server(router);
}


// Run only if executed directly (e.g: `node src/main.js`)
if (require.main === module) {
    main();
}

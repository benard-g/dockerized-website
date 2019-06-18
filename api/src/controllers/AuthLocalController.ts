import { Request, Response } from "express";
import Boom from "@hapi/boom";

import User from "../models/entities/User";
import UserRepository from "../models/UserRepository";

import EmailValidator from "../validators/EmailValidator";
import NameValidator from "../validators/NameValidator";
import PasswordValidator from "../validators/PasswordValidator";

import PasswordService from "../services/PasswordService";


class AuthLocalController {

    private readonly userRepository: UserRepository;

    private readonly emailValidator: EmailValidator;
    private readonly nameValidator: NameValidator;
    private readonly passwordValidator: PasswordValidator;

    private readonly passwordService: PasswordService;

    constructor(
        userRepository: UserRepository,

        emailValidator: EmailValidator,
        nameValidator: NameValidator,
        passwordValidator: PasswordValidator,

        passwordService: PasswordService
    ) {
        this.userRepository = userRepository;
        this.emailValidator = emailValidator;
        this.nameValidator = nameValidator;
        this.passwordValidator = passwordValidator;
        this.passwordService = passwordService;
    }

    public readonly registerUser = async (req: Request, res: Response) => {
        const userName: string = req.body.name;
        const userEmail: string = req.body.email;
        const userPassword: string = req.body.password;

        if (!userName || !userEmail || !userPassword) {
            throw Boom.badRequest("Missing fields in user");
        }
        if (!this.emailValidator.validate(userEmail)) {
            throw Boom.badRequest("Invalid email format");
        }
        if (!this.nameValidator.validate(userName)) {
            throw Boom.badRequest("Name must be at least 1 character long");
        }
        if (!this.passwordValidator.validate(userPassword)) {
            throw Boom.badRequest(
                "Password must be at least 8 characters long and "
                + "contain lowercase letters, uppercase letters, digits and symbols"
            );
        }

        const existingUser = await this.userRepository.getUserByEmail(userEmail);
        if (existingUser) {
            throw Boom.conflict(`User with email "${userEmail}" already exists`);
        }

        const cipheredPassword = await this.passwordService.cipherPassword(userPassword);
        const user = new User({
            email: userEmail,
            name: userName,
            cipheredPassword: cipheredPassword
        });
        const createdUser = await this.userRepository.create(user);

        res.status(201).json({
            message: "User created",
            user: {
                id: createdUser.id,
                name: createdUser.name,
                email: createdUser.email
            }
        });
    };
}


export default AuthLocalController;

import Bcrypt from "bcrypt";


class PasswordService {
    public readonly cipherPassword = async (password: string): Promise<string> => {
        return Bcrypt.hash(password, 10);
    };

    public readonly validatePassword = async (cipheredPassword: string, password: string): Promise<boolean> => {
        return Bcrypt.compare(password, cipheredPassword);
    };
}


export default PasswordService;

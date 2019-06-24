import PasswordValidator from "../../src/validators/PasswordValidator";


// Valid passwords (should all be considered valid)
const VALID_PASSWORD_1 = "ab123AB!";
const VALID_PASSWORD_2 = "123abcABC!";
const VALID_PASSWORD_3 = "!123ABCabc";
const VALID_PASSWORD_4 = "ABC!abc123";
const VALID_PASSWORD_5 = "AbCdEf1gHiJ%kL";

// Wrong passwords (should all be considered invalid)
const EMPTY = "";
const TOO_SHORT_4 = "Aa1$";
const TOO_SHORT_7 = "ABab12$";
const MISSING_LOWERCASE = "ABC123$#";
const MISSING_UPPERCASE = "abc123$@";
const MISSING_DIGIT = "abcdABCD!)";
const MISSING_SYMBOL = "abcdABCD1234";


const passwordValidator = new PasswordValidator();

describe("Valid passwords", () => {
    test("Valid password 1", () => {
        const result = passwordValidator.validate(VALID_PASSWORD_1);
        expect(result).toBe(true);
    });

    test("Valid password 2", () => {
        const result = passwordValidator.validate(VALID_PASSWORD_2);
        expect(result).toBe(true);
    });

    test("Valid password 3", () => {
        const result = passwordValidator.validate(VALID_PASSWORD_3);
        expect(result).toBe(true);
    });

    test("Valid password 4", () => {
        const result = passwordValidator.validate(VALID_PASSWORD_4);
        expect(result).toBe(true);
    });

    test("Valid password 5", () => {
        const result = passwordValidator.validate(VALID_PASSWORD_5);
        expect(result).toBe(true);
    });
});

describe("Wrong passwords", () => {
    test("Empty", () => {
        const result = passwordValidator.validate(EMPTY);
        expect(result).toBe(false);
    });

    test("Too short (size 4)", () => {
        const result = passwordValidator.validate(TOO_SHORT_4);
        expect(result).toBe(false);
    });

    test("Too short (size 7)", () => {
        const result = passwordValidator.validate(TOO_SHORT_7);
        expect(result).toBe(false);
    });

    test("Missing lowercase", () => {
        const result = passwordValidator.validate(MISSING_LOWERCASE);
        expect(result).toBe(false);
    });

    test("Missing uppercase", () => {
        const result = passwordValidator.validate(MISSING_UPPERCASE);
        expect(result).toBe(false);
    });

    test("Missing digit", () => {
        const result = passwordValidator.validate(MISSING_DIGIT);
        expect(result).toBe(false);
    });

    test("Missing symbol", () => {
        const result = passwordValidator.validate(MISSING_SYMBOL);
        expect(result).toBe(false);
    });
});

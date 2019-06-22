import EmailValidator from "../../src/validators/EmailValidator";


// Valid emails (should all be considered valid)
const VALID_EMAIL_1 = "name@domain.com";
const VALID_EMAIL_2 = "name.surname@domain.com";
const VALID_EMAIL_3 = "name@sub.domain.com";
const VALID_EMAIL_4 = "a@b.c";

// Wrong emails (should all be considered wrong)
const WRONG_EMAIL_1 = "name";
const WRONG_EMAIL_2 = "name@domain";
const WRONG_EMAIL_3 = "name@.com"
const WRONG_EMAIL_4 = "@domain.com";
const WRONG_EMAIL_5 = "name.com";

// Edge cases (should all be considered wrong as well)
const EMPTY = "";
const A = "@";
const SENTENCE_CONTAINING_EMAIL = "My email is name@domain.com";


const emailValidator = new EmailValidator();

describe("Valid emails", () => {
    test("Format name@domain.com", () => {
        const result = emailValidator.validate(VALID_EMAIL_1);
        expect(result).toBe(true);
    });

    test("Format name.surname@domain.com", () => {
        const result = emailValidator.validate(VALID_EMAIL_2);
        expect(result).toBe(true);
    });

    test("Format name@sub.domain.com", () => {
        const result = emailValidator.validate(VALID_EMAIL_3);
        expect(result).toBe(true);
    });

    test("Format minimalist email", () => {
        const result = emailValidator.validate(VALID_EMAIL_4);
        expect(result).toBe(true);
    });
});

describe("Wrong emails", () => {
    test("Format name", () => {
        const result = emailValidator.validate(WRONG_EMAIL_1);
        expect(result).toBe(false);
    });

    test("Format name@domain", () => {
        const result = emailValidator.validate(WRONG_EMAIL_2);
        expect(result).toBe(false);
    });

    test("Format name@.com", () => {
        const result = emailValidator.validate(WRONG_EMAIL_3);
        expect(result).toBe(false);
    });

    test("Format @domain.com", () => {
        const result = emailValidator.validate(WRONG_EMAIL_4);
        expect(result).toBe(false);
    });

    test("Format name.com", () => {
        const result = emailValidator.validate(WRONG_EMAIL_5);
        expect(result).toBe(false);
    });
});

describe("Edge cases", () => {
    test("Empty string", () => {
        const result = emailValidator.validate(EMPTY);
        expect(result).toBe(false);
    });

    test("Only '@'", () => {
        const result = emailValidator.validate(A);
        expect(result).toBe(false);
    });

    test("Sentence containing email", () => {
        const result = emailValidator.validate(SENTENCE_CONTAINING_EMAIL);
        expect(result).toBe(false);
    });
});

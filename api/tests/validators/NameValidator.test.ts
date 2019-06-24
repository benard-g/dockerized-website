import NameValidator from "../../src/validators/NameValidator";


// Valid names (should all be considered valid)
const VALID_NAME_1 = "john";
const VALID_NAME_2 = "John Doe";
const VALID_NAME_3 = "john_doe";

// Wrong names (should all be considered invalid)
const EMPTY = "";


const nameValidator = new NameValidator();

describe("Valid names", () => {
    test("Valid name 1", () => {
        const result = nameValidator.validate(VALID_NAME_1);
        expect(result).toBe(true);
    });

    test("Valid name 2", () => {
        const result = nameValidator.validate(VALID_NAME_2);
        expect(result).toBe(true);
    });

    test("Valid name 3", () => {
        const result = nameValidator.validate(VALID_NAME_3);
        expect(result).toBe(true);
    });
});

describe("Wrong names", () => {
    test("Empty name", () => {
        const result = nameValidator.validate(EMPTY);
        expect(result).toBe(false);
    });
});

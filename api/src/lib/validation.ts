//////////////////////////// VARIABLES ////////////////////////////

const VALID_SPECIAL_CHARS_FOR_EMAIL = ["+", "-", "_", "~", "!", "#", "$", "%",
    "&", "'", ".", "/", "=", "^", "{", "}", "|"];

const VALID_SPECIAL_CHARS_FOR_PASS = ["+", "-", "_", "~", "!", "#", "$", "%",
    "&", "'", ".", "/", "=", "^", "{", "}", "|", "(", ")", "[", "]"]

const MIN_PASS_LENGTH = 6;
const MAX_PASS_LENGTH = 16;


//////////////////////////// FUNCTIONS ////////////////////////////

export function validateEmail(email: string): Boolean {
    // when number of "@" is not 1
    const countOfAt = getCountOfChar(email, "@");
    if (countOfAt != 1)
        return false;

    const indexOfAt = email.indexOf("@");
    const emailBeforeAt = email.substring(0, indexOfAt);
    const emailAfterAt = email.substring(indexOfAt + 1);

    // when number of chars before or after "@" is not enough
    if (emailBeforeAt.length == 0
        || emailAfterAt.length < 3)
        return false;

    // when any "." after "@" not found
    const countOfDotAfterAt = getCountOfChar(emailAfterAt, ".");
    if (countOfDotAfterAt == 0)
        return false;

    // when last char is "."
    const lastChar = emailAfterAt[emailAfterAt.length - 1];
    if (lastChar === ".")
        return false;

    // when chars is not in alphanumeric or special chars
    if (!isAlphanumeric(email, VALID_SPECIAL_CHARS_FOR_EMAIL))
        return false;

    return true;
}

export function validatePassword(password: string): Boolean {
    // when password length is invalid
    if (password.length < MIN_PASS_LENGTH
        || password.length > MAX_PASS_LENGTH)
        return false;

    // when chars is not in alphanumeric or special chars
    if (!isAlphanumeric(password, VALID_SPECIAL_CHARS_FOR_PASS))
        return false;

    return true;
}

export function getCountOfChar(data: string, chrToBeSearch: string): number {
    let count = 0;

    for (const chr of data)
        if (chr === chrToBeSearch)
            count++;

    return count;
}

export function isAlphanumeric(data: string, specialChars: string[]): boolean {
    for (const chr of data)
        if (!(+chr >= 48 && +chr <= 57)  // not in "0-9"
            && !(+chr >= 65 && +chr <= 90)  // not in "a-z"
            && !(+chr >= 97 && +chr <= 122)  // not in "A-Z"
            && !specialChars.includes(chr))  // not in special chars
            return false;

    return true;
}  
import bcrypt from "bcrypt";
import crypto from "crypto";

const SALT_ROUNDS = 12;

//hash
export const hashPassword = async (password) => {
    return bcrypt.hash(password, SALT_ROUNDS);
}

//compare
export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

//hash token in db
export const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
}

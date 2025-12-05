//Utils for handling JWT tokens
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "BloatMatchkeyA+420";

export const generateToken = (email: string) => {
    return jwt.sign({ email }, JWT_SECRET, {
        expiresIn: "2h",
    });
};

export const verifyToken = (token : string) => {
    const isOk = jwt.verify(token, JWT_SECRET);
    return isOk;
};

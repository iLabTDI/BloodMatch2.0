//Utils for handling JWT tokens
import jwt,{JwtPayload} from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "BloatMatchkeyA+420";

interface TokenPayload {
    id: number;
    email: string;
}

export const generateToken = (payload: TokenPayload): string => {
    return jwt.sign( payload, JWT_SECRET, {
            expiresIn: "2h",
    });
};

export const verifyToken = (token : string): TokenPayload | JwtPayload => {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
};

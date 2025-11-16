import {hash, compare} from "bcryptjs"

export const  encrypt = async (Pass: string) => {
    const hashedPassword = await hash(Pass, 10);
    return hashedPassword;
}

export const verified = async (Pass: string, hash: string) =>{
    return await compare(Pass, hash);
}
import dotenv from 'dotenv';

dotenv.config();

const TOKEN_EXPIRETIME = process.env.TOKEN_EXPIRETIME || 3600;
const TOKEN_ISSUER = process.env.TOKEN_ISSUER || "libraryissuer";
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'superduperencryptedsecret'

const SERVER = {
    token: {
        expireTime: TOKEN_EXPIRETIME,
        issuer: TOKEN_ISSUER,
        secret: TOKEN_SECRET
    }
} 

const config = { server: SERVER }

export default config;

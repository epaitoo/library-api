import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";
import config from "../config/config";

// Extract the JWT From Token
export const getJWT = (req: Request, res: Response, next: NextFunction) => {

    let token = req.headers.authorization?.split(' ')[1];

    if(token) {
        jwt.verify(token, config.server.token.secret, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error,
                    error
                });
            } else {
               res.locals.jwt = decoded;
               next(); 
            }
        })
    } else {
        return res.status(401).json({ message: "User not Unauthorized" });
    }

}
import jwt from "jsonwebtoken";
import config from "../config/config";
import { IUser } from "../interfaces/user.interface";

export class AuthService {
  // Sign the JWT by Creating Token & Return it to User
  public signJWT(
    user: IUser,
    callback: (error: Error | null, token: string | null) => void
  ): void {
    var timeSinceEpoch = new Date().getTime();
    var expirationTime =
      timeSinceEpoch + Number(config.server.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    try {
      jwt.sign(
        { email: user.email },
        config.server.token.secret,
        {
          issuer: config.server.token.issuer,
          algorithm: "HS256",
          expiresIn: expirationTimeInSeconds,
        },
        (error, token) => {
          if (error) {
            callback(error, null);
          } else if (token) {
            callback(null, token);
          }
        }
      );
    } catch (error: any) {
      callback(error, null);
    }
  }
}

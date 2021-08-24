import { UserService } from "../services/user.service";
import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import { AuthService } from "../services/auth.service";
import { User } from "../models/user.model";

export class UserController {
  constructor(private userService: UserService) {}

  // Register A User
  public createUser = async (req: Request, res: Response) => {
    try {
      // hash the user password
      bcryptjs.hash(req.body.password, 10, (hashError, hash) => {
        if (hashError) {
          return res.status(500).json({
            message: hashError.message,
            error: hashError,
          });
        }

        let user = new User({
          fullName: req.body.fullName,
          email: req.body.email,
          password: hash,
        });


        return this.userService
          .addUser(user)
          .then((newUser) => {
            return res.status(201).json({
              message: "New User Added Successfully",
              user: {
                "fullName" : newUser.fullName,
                "email": newUser.email,
                "id": newUser.id
              }
            });
          })
          .catch((error) => {
            // Check for duplication
            if (error.name === 'MongoError' && error.code === 11000) {
              res.status(400).json({ message: "Email already in use" });
            } else {
              return res.status(500).json({
                message: error.message,
                error,
              });
            }
           
          });
      });
    } catch (e: any) {
      return res.status(500).send(e.message);
    }
  };

  // Login User
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { email, password } = req.body;

      // Find the user using the email
      const user = await this.userService.findUserByEmail(email);

      if (user) {
        bcryptjs.compare(password, user.password, (error, result) => {
          if (error) {
            return res.status(401).json({
              message: "Password Mismatch",
            });
          } else if (result) {
            const auth: AuthService = new AuthService();

            auth.signJWT(user, (err, token) => {
              if (err) {
                return res
                  .status(500)
                  .json({ message: err.message, error: err });
              } else if (token) {
                return res.status(200).json({
                  message: "Login Successful",
                  token,
                  user: {
                    "fullName" : user.fullName,
                    "email": user.email,
                    "id": user.id
                  }
                });
              }
            });
          }
        });
      }
    } catch (e: any) {
      return res.status(500).send(e.message);
    }
  };

  public getUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.findUserById(req.params.id);
      return res.status(200).json({
        user,
      });
    } catch (e: any) {
      return res.status(500).send(e.message);
    }
  };
}

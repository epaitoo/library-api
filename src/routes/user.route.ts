import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { getJWT } from "../middleware/auth.middleware";

export class UserRoute {
  public router = Router();

  constructor(private userController: UserController) {
    this.setRoute();
  }

  private setRoute() {
      this.router.post("/register", this.userController.createUser);
      this.router.post("/login", this.userController.login);
      this.router.get("/:id", getJWT, this.userController.getUser)
  }
}

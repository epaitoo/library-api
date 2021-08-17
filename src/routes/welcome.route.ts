import { Request, Response, Router } from "express";

export class WelcomeRoute {

    public router = Router();

    constructor() {
        this.setRoute();
    }

    private setRoute() {
        this.router.get("/", (_: Request, res: Response) => {
            res.json({
                message: 'Welcome to the Library API',
            });
        });
    }

}
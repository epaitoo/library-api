import express from "express";
import cors from "cors";
import helmet from "helmet";
import { WelcomeRoute } from "./routes/welcome.route";

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.setConfig();
        this.setRoutes();

    }

    private setConfig(): void {
        // Allows us to receive requests with data in json format
        this.app.use(express.json({ limit: "50mb" }));
        // Allows us to receive requests with data in x-www-form-urlencoded format
        this.app.use(express.urlencoded({ limit: "50mb", extended: true }));
        // Enables Helmet 
        this.app.use(helmet());
        // Enables cors
        this.app.use(cors());
    }

    private setRoutes() {
        const welcomeRoute = new WelcomeRoute();
        this.app.use("/", welcomeRoute.router);
    }

   


}

export default new App().app;

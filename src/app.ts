import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

import { WelcomeRoute } from "./routes/welcome.route";

class App {
  public app: express.Application;
  public mongoUrl: string = "mongodb://localhost:27017/library";

  constructor() {
    this.app = express();
    this.setConfig();
    this.setUpMongo();
    this.setRoutes();
  }

  private setConfig(): void {
    dotenv.config();
    if (process.env.NODE_ENV === "development") {
      this.app.use(morgan("dev"));
    }

    // Allows us to receive requests with data in json format
    this.app.use(express.json({ limit: "50mb" }));
    // Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(express.urlencoded({ limit: "50mb", extended: true }));
    // Enables Helmet
    this.app.use(helmet());
    // Enables cors
    this.app.use(cors());
  }

  // Setup MongoDB
  private setUpMongo(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false
    });
  }

  private setRoutes(): void {
    const welcomeRoute = new WelcomeRoute();
    this.app.use("/", welcomeRoute.router);
  }
}

export default new App().app;

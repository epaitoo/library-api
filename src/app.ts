import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

import { WelcomeRoute } from "./routes/welcome.route";
import { BookRoute } from "./routes/book.route";
import { UserRoute } from "./routes/user.route";
import { BookController } from "./controllers/book.controller";
import { UserController } from "./controllers/user.controller";
import { BookService } from "./services/book.service";
import { UserService } from "./services/user.service";

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
        useFindAndModify: false,
        useCreateIndex: true
    });
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (_: any, converted: any) => {
        delete converted._id;
      },
    })
  }

  private setRoutes(): void {
    const welcome = new WelcomeRoute();
    const bookService: BookService = new BookService();
    const userService: UserService = new UserService();

    const userRoute = new UserRoute(new UserController(userService));
    const bookRoute = new BookRoute(new BookController(bookService));

    // Welcome Route
    this.app.use("/", welcome.router);
    // Book Route
    this.app.use("/api/books", bookRoute.router);
    // User Route
    this.app.use("/api/users", userRoute.router);
  }
}

export default new App().app;

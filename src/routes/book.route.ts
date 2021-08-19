import { Router } from "express";
import { BookController } from "../controllers/book.controller";

export class BookRoute {
  public router = Router();
  public bookController: BookController;

  constructor(bookController: BookController) {
    this.bookController = bookController;
    this.setRoute();
  }

  private setRoute() {
    this.router.route("/").get(this.bookController.getAllBooks);
    this.router
      .route("/:id")
      .get(this.bookController.getABook)
      .put(this.bookController.updateABook)
      .delete(this.bookController.deleteABook);
  }
}

import { Router } from "express";
import { BookController } from "../controllers/book.controller";

export class BookRoute {
  public router = Router();

  constructor(private bookController: BookController) {
    this.setRoute();
  }

  private setRoute() {
    this.router
      .route("/")
      .get(this.bookController.getAllBooks)
      .post(this.bookController.createBook);
    this.router
      .route("/:id")
      .get(this.bookController.getBook)
      .put(this.bookController.updateBook)
      .delete(this.bookController.deleteBook);
  }
}

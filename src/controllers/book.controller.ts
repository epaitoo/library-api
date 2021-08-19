import { BookService } from "../services/book.service";
import { Request, Response } from "express";


export class BookController {

    
    private bookService: BookService

    // Get All Books
    public getAllBooks = async (_:Request, res: Response) => {
        try {
            const books = await this.bookService.findAll();
            res.send(books);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    }


    // Get A Book
    public getABook = async (req:Request, res: Response) => {
        try {
            const book = await this.bookService.findABook(req.params.id);
            res.send(book);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    }


    // Update A Book
    public updateABook = async (req:Request, res: Response) => {
        try {
           const updatedBook = await this.bookService.update(req.params.id, req.body);
           res.send(updatedBook);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    }


    // Delete A Book
    public deleteABook = async (req:Request, res: Response) => {
        try {
            const deletedBook = await this.bookService.delete(req.params.id);
            res.send(deletedBook);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    }


}
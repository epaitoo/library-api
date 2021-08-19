import { IBook } from "../interfaces/book.interface";
import { Book } from "../models/book.model";

export class BookService {


    public findAll(): Promise<IBook[]>{
        return Book.find({}).exec();
    }


    public addBook(book: IBook): Promise<IBook> {
        const newBook = new Book(book);
        return newBook.save();
    }


    public async findABook(id: string): Promise<IBook> {
        const book = await Book.findById(id).exec();

        if (!book) {
            throw new Error(`Book with id '${id}' not found`);
        }

        return book;

    }

    

    public async update(id: string, book: IBook | Partial<IBook>) : Promise<IBook> {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            book
        ).exec();

        if (!updatedBook) {
            throw new Error(`Book with id '${id}' not found`);
        }

        return updatedBook;
    }



    public async delete(id: string): Promise<IBook> {
        const deletedBook = await Book.findByIdAndDelete(id).exec(); 

        if (!deletedBook) {
            throw new Error(`Book with id '${id}' not found`);
        }

        return deletedBook;

    }





}
import { Schema, model } from "mongoose";
import { IBook } from "../interfaces/book.interface";

// Schema corresponding to the document interface.
const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: [true, "Field is required"] },
    author: { type: String, required: [true, "Field is required"] },
    genre: { type: String, required: [true, "Field is required"] },
    releaseYear: { type: Number, required: [true, "Field is required"] },
  }, // Customizing the versionKey
  { versionKey: "customVersionKey" }
);

// Book Model
export const Book = model<IBook>("Book", BookSchema);

import {Author} from "./author";
import {Publisher} from "./publisher";

export class Book {
  _id: string;
  title: string;
  author: Author;
  publisher: Publisher;
  available: number;
  pages: number;
  genre: string;
  language: string;
}

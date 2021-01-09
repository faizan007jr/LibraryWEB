import { Injectable } from '@angular/core';
import {Book} from "./book";
import { Http, Response } from "@angular/http";
import { environment } from 'src/environments/environment';

@Injectable()
export class BookDataService {
  private booksUrl = `${environment.apiURL}/books`;

  constructor(private http: Http) { }

  private handleError (error: any) {
    console.log("error::: " + error);
  };

  getBooks(): Promise<void | Book[]> {
    return this.http.get(this.booksUrl)
      .toPromise()
      .then(response => response.json() as Book[])
      .catch(this.handleError);
  }

  getSingleBook(bookID: String): Promise<void | Book> {
    return this.http.get(this.booksUrl + '/' + bookID)
      .toPromise()
      .then(response => response.json() as Book)
      .catch(this.handleError);
  }

  createBook(newBook: Book): Promise<void | Book> {
    return this.http.post(this.booksUrl, newBook)
      .toPromise()
      .then(response => response.json() as Book)
      .catch(this.handleError);
  }

  updateBook(updatedBook: Book): Promise<void | Book> {
    return this.http.put(this.booksUrl + "/" + updatedBook._id, updatedBook)
      .toPromise()
      .then(response => response.json() as Book)
      .catch(this.handleError);
  }

  deleteBook(bookID: string): Promise<void | string> {
    return this.http.delete(this.booksUrl + "/" + bookID)
      .toPromise()
      .then();
  }
}

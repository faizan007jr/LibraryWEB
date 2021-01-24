import { Injectable } from '@angular/core';
import { Book } from "./book";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class BookDataService implements HttpInterceptor {
  private booksUrl = `${environment.apiURL}/books/`;

  constructor(private http: HttpClient,
    private readonly spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const spinnerSubscription: Subscription = this.spinnerService.spinner$.subscribe();
    return next.handle(req).pipe(finalize(() => spinnerSubscription.unsubscribe()));
  }

  private handleError(error: any) {
    console.log("error::: " + error);
  };

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl)
      .pipe(catchError(err => {
        this.handleError(err);
        return [];
      }));
  }

  async getSingleBook(bookID: String): Promise<Book> {
    try {
      return await this.http.get(this.booksUrl + bookID).toPromise() as Book;
    } catch (err) {
      console.log("error::: " + err);
    }
  }

  async createBook(newBook: Book): Promise<Book> {
    try {
      return await this.http.post(this.booksUrl, newBook).toPromise() as Book;
    } catch (err) {
      console.log("error::: " + err);
    }
  }

  async updateBook(updatedBook: Book): Promise<Book> {
    try {
      return await this.http.put(this.booksUrl + updatedBook._id, updatedBook).toPromise() as Book;
    } catch (err) {
      console.log("error::: " + err);
    }
  }

  async deleteBook(bookID: string): Promise<void> {
    try {
      await this.http.delete(this.booksUrl + bookID).toPromise();
    } catch (err) {
      console.log("error::: " + err);
    }
  }
}

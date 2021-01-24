import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Author } from "./author";
import { Observable, Subscription } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class AuthorDataService implements HttpInterceptor {
  private authorsURL = `${environment.apiURL}/authors`;

  constructor(private http: HttpClient,
    private readonly spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const spinnerSubscription: Subscription = this.spinnerService.spinner$.subscribe();
    return next.handle(req).pipe(finalize(() => spinnerSubscription.unsubscribe()));
  }

  private handleError(error: any) {
    console.log("error:::", error);
  };

  async getAuthors(): Promise<Author[]> {
    try {
      return await this.http.get(this.authorsURL).toPromise() as Author[];
    } catch (err) {
      this.handleError(err);
      return [];
    }
  }

  async createAuthor(newAuthor: Author): Promise<Author> {
    try {
      return await this.http.post(this.authorsURL, newAuthor).toPromise() as Author;
    } catch (err) {
      this.handleError(err);
    }
  }
}

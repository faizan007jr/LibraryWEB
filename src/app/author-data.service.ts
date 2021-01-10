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
    console.log("error");
  };

  getAuthors(): Promise<void | Author[]> {
    return this.http.get(this.authorsURL)
      .toPromise()
      .then(response => response as Author[])
      .catch(this.handleError);
  }

  createAuthor(newAuthor: Author): Promise<void | Author> {
    return this.http.post(this.authorsURL, newAuthor)
      .toPromise()
      .then(response => response as Author);
  }
}

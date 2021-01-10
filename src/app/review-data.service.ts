import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Review } from "./review";
import { Observable, Subscription } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class ReviewDataService implements HttpInterceptor {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient,
    private readonly spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const spinnerSubscription: Subscription = this.spinnerService.spinner$.subscribe();
    return next.handle(req).pipe(finalize(() => spinnerSubscription.unsubscribe()));
  }

  private handleError(error: any) {
    console.log("error");
  };

  getRatings(bookID: string): Promise<void | number> {
    return this.http.get(this.apiURL + "/ratings/" + bookID)
      .toPromise()
      .then(response => JSON.parse(JSON.stringify(response)).ratings as number)
      .catch(this.handleError);
  }

  createReview(review: Review): Promise<void | Review> {
    return this.http.post(this.apiURL + "/reviews/", review)
      .toPromise()
      .then(res => res as Review);
  }
}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Publisher } from "./publisher";
import { Observable, Subscription } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class PublisherDataService implements HttpInterceptor {
  private publishersURL = `${environment.apiURL}/publishers`;

  constructor(private http: HttpClient,
    private readonly spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const spinnerSubscription: Subscription = this.spinnerService.spinner$.subscribe();
    return next.handle(req).pipe(finalize(() => spinnerSubscription.unsubscribe()));
  }

  async getPublishers(): Promise<Publisher[]> {
    try {
      return await this.http.get(this.publishersURL).toPromise() as Publisher[];
    } catch(err) {
      console.log(err);
      return [];
    }
  }

  async createPublisher(publisher: Publisher): Promise<Publisher> {
    try {
      return await this.http.post(this.publishersURL, publisher).toPromise() as Publisher;
    } catch (err) {
      console.log(err);
    }
  }
}

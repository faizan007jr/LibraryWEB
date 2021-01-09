import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import { environment } from 'src/environments/environment';
import {Publisher} from "./publisher";

@Injectable()
export class PublisherDataService {
  private publishersURL = `${environment.apiURL}/publishers`;

  constructor(private http: Http) { }

  private handleError (error: any) {
    console.log("error");
  };

  getPublishers(): Promise<void | Publisher[]> {
    return this.http.get(this.publishersURL)
      .toPromise()
      .then(response => response.json() as Publisher[])
      .catch(this.handleError);
  }

  createPublisher(publisher: Publisher): Promise<void | Publisher> {
    return this.http.post(this.publishersURL, publisher)
      .toPromise()
      .then(response => response.json() as Publisher);
  }
}

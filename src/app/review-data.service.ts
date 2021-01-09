import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import { environment } from 'src/environments/environment';
import {Review} from "./review";

@Injectable()
export class ReviewDataService {
  private apiURL = environment.apiURL;

  constructor(private http: Http) { }

  private handleError (error: any) {
    console.log("error");
  };

  getRatings(bookID: string): Promise<void | number> {
    return this.http.get(this.apiURL + "/ratings/" + bookID)
      .toPromise()
      .then(response => response.json().ratings as number)
      .catch(this.handleError);
  }

  createReview(review: Review): Promise<void | Review> {
    return this.http.post(this.apiURL + "/reviews/", review)
      .toPromise()
      .then(res => res.json() as Review);
  }
}

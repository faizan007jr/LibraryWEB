import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import { environment } from 'src/environments/environment';
import {Author} from "./author";

@Injectable()
export class AuthorDataService {
  private authorsURL = `${environment.apiURL}/authors`;

  constructor(private http: Http) { }

  private handleError (error: any) {
    console.log("error");
  };

  getAuthors(): Promise<void | Author[]> {
    return this.http.get(this.authorsURL)
      .toPromise()
      .then(response => response.json() as Author[])
      .catch(this.handleError);
  }

  createAuthor(newAuthor: Author): Promise<void | Author> {
    return this.http.post(this.authorsURL, newAuthor)
      .toPromise()
      .then(response => response.json() as Author);
  }
}

import {Component, NgZone, OnInit} from '@angular/core';
import {AuthorDataService} from "../author-data.service";
import {Router} from "@angular/router";
import {Author} from "../author";

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css'],
  providers: [AuthorDataService]
})
export class AddAuthorComponent implements OnInit {

  public newAuthor: Author = {
    _id: "",
    bestTitle: "",
    firstName: "",
    lastName: ""
  };

  constructor(private authorService: AuthorDataService,
              private router: Router,
              private ngZone: NgZone) { }

  ngOnInit() {
  }

  createNewAuthor(author: Author): void {
    if(this.newAuthor.firstName && this.newAuthor.lastName) {
      this.authorService.createAuthor(author)
        .then((insertedAuthor: Author) => {
          this.ngZone.run(() => {
            this.router.navigate([`/add-book`]);
          });
        });
    }
  }

  pageContent = {
    header: {
      title: 'Add new Author',
      body: 'Fill the form below.'
    }
  };
}

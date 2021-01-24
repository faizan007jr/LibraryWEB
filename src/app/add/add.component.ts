import { Component, NgZone, OnInit } from '@angular/core';
import { BookDataService } from "../book-data.service";
import { Book } from "../book";
import { Router } from "@angular/router";
import { Author } from "../author";
import { Publisher } from "../publisher";
import { AuthorDataService } from "../author-data.service";
import { PublisherDataService } from "../publisher-data.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [BookDataService, AuthorDataService, PublisherDataService]
})
export class AddComponent implements OnInit {

  public newBook: Book = {
    _id: "",
    author: null,
    available: 0,
    genre: "",
    language: "",
    pages: 0,
    publisher: null,
    title: ""
  };

  public authors: Author[];
  public publishers: Publisher[];

  constructor(private bookService: BookDataService,
    private authorService: AuthorDataService,
    private publisherService: PublisherDataService,
    private router: Router,
    private ngZone: NgZone) { }

  async ngOnInit() {
    this.authors = await this.authorService.getAuthors();
    this.publishers = await this.publisherService.getPublishers();
  }

  async createNewBook(newBook: Book) {
    if (this.newBook.title && this.newBook.author && this.newBook.available && this.newBook.genre && this.newBook.language && this.newBook.pages && this.newBook.publisher) {
      let insertedBook = await this.bookService.createBook(newBook);
      this.ngZone.run(() => this.router.navigate([`/books/${insertedBook._id}`]));
    }
  }

  pageContent = {
    header: {
      title: 'Add new Book',
      body: 'Fill the form below.'
    }
  };
}

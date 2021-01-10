import { Component, OnInit } from "@angular/core";
import { Book } from "../book";
import { BookDataService } from '../book-data.service';

@Component({
  selector: 'app-book-list',
  templateUrl: "./book-list.component.html",
  styleUrls: ['./book-list.component.css'],
  providers: [BookDataService]
})
export class BookListComponent implements OnInit {

  books: Book[];

  constructor(private bookService: BookDataService) {}

  ngOnInit() {
    this.bookService.getBooks()
      .subscribe((books: Book[]) => this.books = books);
  }

  pageContent = {
    header: {
      title: 'Library Books',
      body: 'Books we have. Click on book for details'
    }
  };

}

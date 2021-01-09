import { Component, NgZone, OnInit } from '@angular/core';
import { Book } from "../book";
import { BookDataService } from '../book-data.service';
import { switchMap } from "rxjs/operators";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ReviewDataService } from "../review-data.service";
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  providers: [BookDataService, ReviewDataService]
})
export class BookDetailsComponent implements OnInit {

  selectedBook: Book;
  ratings: number;

  constructor(private bookService: BookDataService,
    private reviewService: ReviewDataService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params: Params) => {
        this.reviewService.getRatings(params['bookid'])
          .then((ratings: number) => this.ratings = ratings);

        return this.bookService.getSingleBook(params['bookid']);
      }))
      .subscribe((book: Book) => {
        this.selectedBook = book;
        this.pageContent.header.title = book.title;
        this.pageContent.header.body = "Details for selected Book.";
      });
  }

  public deleteBook(bookID: string): void {
    this.bookService.deleteBook(bookID)
      .then((str: string) => {
        this.ngZone.run(() => {
          this.router.navigate([`/books`]);
        });
      });
  }

  pageContent = {
    header: {
      title: '',
      body: ''
    }
  };
}

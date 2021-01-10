import { Component, NgZone, OnInit } from '@angular/core';
import { ReviewDataService } from "../review-data.service";
import { BookDataService } from "../book-data.service";
import { switchMap } from "rxjs/operators";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Book } from "../book";
import { Review } from "../review";
import { StarRatingComponent } from "ng-starrating";

@Component({
  selector: 'app-review-book',
  templateUrl: './review-book.component.html',
  styleUrls: ['./review-book.component.css'],
  providers: [ReviewDataService, BookDataService]
})
export class ReviewBookComponent implements OnInit {

  constructor(private reviewService: ReviewDataService,
    private bookService: BookDataService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone) { }

  pageContent = {
    header: {
      title: '',
      body: ''
    }
  };

  review: Review = {
    title: "",
    _id: "",
    comment: "",
    ratings: 0
  };

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => {
      this.review.title = params['bookid'];
      this.reviewService.getRatings(params['bookid'])
        .then((r: number) => { if (r != null) this.review.ratings = r; });
      return this.bookService.getSingleBook(params['bookid'])
    }))
      .subscribe((book: Book) => {
        this.pageContent.header.title = book.title;
        this.pageContent.header.body = "Review the selected Book.";
      })
  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    this.review.ratings = $event.newValue;
  }

  reviewBook(review: Review) {
    if (this.review.title && this.review.ratings) {
      this.reviewService.createReview(review)
        .then((insertedReview: Review) => {
          this.ngZone.run(() => {
            this.router.navigate([`/books/${this.review.title}`]);
          });
        });
    }
  }
}

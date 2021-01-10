import { Component, NgZone, OnInit } from '@angular/core';
import { BookDataService } from "../book-data.service";
import { Book } from "../book";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Author } from "../author";
import { Publisher } from "../publisher";
import { AuthorDataService } from "../author-data.service";
import { PublisherDataService } from "../publisher-data.service";

@Component({
	selector: 'app-book-update',
	templateUrl: './book-update.component.html',
	styleUrls: ['./book-update.component.css'],
	providers: [BookDataService, AuthorDataService, PublisherDataService]
})
export class BookUpdateComponent implements OnInit {

	public selectedBook: Book = {
		_id: '',
		title: '',
		author: {
			_id: '',
			firstName: '',
			lastName: '',
			bestTitle: ''
		},
		publisher: {
			_id: '',
			name: '',
			city: ''
		},
		available: 0,
		pages: 0,
		genre: '',
		language: ''
	};

	public authors: Author[];
	public publishers: Publisher[];

	constructor(private bookService: BookDataService,
		private authorService: AuthorDataService,
		private publisherService: PublisherDataService,
		private route: ActivatedRoute,
		private router: Router,
		private ngZone: NgZone) { }

	ngOnInit(): void {
		this.route.params.pipe(switchMap((params: Params) => this.bookService.getSingleBook(params['bookid'])))
			.subscribe((book: Book) => {
				this.selectedBook = book;
				this.pageContent.header.title = book.title;
				this.pageContent.header.body = "Edit selected Book.";
			});

		this.authorService
			.getAuthors()
			.then((authors: Author[]) => this.authors = authors);

		this.publisherService
			.getPublishers()
			.then((publishers: Publisher[]) => this.publishers = publishers);
	}

	public updateBook(book: Book): void {
		this.bookService.updateBook(book)
			.then((updatedBook: Book) => {
				this.ngZone.run(() => {
					this.router.navigate([`/books/${updatedBook._id}`]);
				});
			});
	}

	public pageContent = {
		header: {
			title: '',
			body: ''
		}
	};
}
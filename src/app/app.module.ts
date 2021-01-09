import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { BookListComponent } from './book-list/book-list.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { FrameworkComponent } from './framework/framework.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AddComponent } from './add/add.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BookUpdateComponent } from './book-update/book-update.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { AddPublisherComponent } from './add-publisher/add-publisher.component';
import { ReviewBookComponent } from './review-book/review-book.component';
import {RatingModule} from "ng-starrating";

@NgModule({
  declarations: [
    BookListComponent,
    AboutComponent,
    HeaderComponent,
    FrameworkComponent,
    BookDetailsComponent,
    AddComponent,
    HomePageComponent,
    BookUpdateComponent,
    NavBarComponent,
    FooterComponent,
    AddAuthorComponent,
    AddPublisherComponent,
    ReviewBookComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'add-book',
        component: AddComponent
      },
      {
        path: 'add-author',
        component: AddAuthorComponent
      },
      {
        path: 'add-publisher',
        component: AddPublisherComponent
      },
      {
        path: 'books',
        component: BookListComponent
      },
      {
        path: 'books/:bookid',
        component: BookDetailsComponent
      },
      {
        path: 'update/:bookid',
        component: BookUpdateComponent
      },
      {
        path: 'review/:bookid',
        component: ReviewBookComponent
      }
    ]),
    RatingModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }

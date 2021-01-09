import {Component, NgZone, OnInit} from '@angular/core';
import {PublisherDataService} from "../publisher-data.service";
import {Publisher} from "../publisher";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-publisher',
  templateUrl: './add-publisher.component.html',
  styleUrls: ['./add-publisher.component.css'],
  providers: [PublisherDataService]
})
export class AddPublisherComponent implements OnInit {

  public newPublisher: Publisher  = {
    _id: "",
    city: "",
    name: ""
  };

  constructor(private publisherService: PublisherDataService,
              private router: Router,
              private ngZone: NgZone) { }

  ngOnInit() {
  }

  createNewPublisher(publisher: Publisher): void {
    if(this.newPublisher.name) {
      this.publisherService.createPublisher(publisher)
        .then((insertedPublisher: Publisher) => {
          this.ngZone.run(() => {
            this.router.navigate([`/add-book`]);
          });
        });
    }
  }

  pageContent = {
    header: {
      title: 'Add new Publisher',
      body: 'Fill the form below.'
    }
  };
}

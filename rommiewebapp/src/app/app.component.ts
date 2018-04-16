import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

class event {
  constructor() { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Rommie';

  info: Observable<any>;

  constructor(db: AngularFireDatabase) {
    this.info = db.object('edepa5/congress').valueChanges();
  }

}

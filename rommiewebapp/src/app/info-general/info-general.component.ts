import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-info-general',
  templateUrl: './info-general.component.html',
  styleUrls: ['./info-general.component.css']
})

export class InfoGeneralComponent implements OnInit {

  info: Observable<any>;

  constructor(db: AngularFireDatabase) {
    this.info = db.object('edepa5/congress').valueChanges();
  }

  ngOnInit() {

  }
}

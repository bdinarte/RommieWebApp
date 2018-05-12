import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-info-general',
  templateUrl: './info-general.component.html',
  styleUrls: ['./info-general.component.css']
})

export class InfoGeneralComponent implements OnInit {

  info_display: Observable<any>;
  database: any;

  constructor(db: AngularFireDatabase) {
    this.info_display = db.object('edepa5/congress').valueChanges();
    this.database = db;
  }

  ngOnInit() {  }

  update_name(name: string){
    this.database.object('edepa5/congress/name').set(name);
  }

  update_end(end: number){}

  update_start(start: number){}

  update_description(description: string){
    this.database.object('edepa5/congress/description').set(description);
  }

  ff(){
    return 'brondon';
  }
}

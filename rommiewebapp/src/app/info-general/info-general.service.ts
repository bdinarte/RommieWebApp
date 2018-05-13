import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InfoGeneralService {

  private info_display: Observable<any>;
  private database: any;

  constructor(db: AngularFireDatabase) {
    this.info_display = db.object('edepa5/congress').valueChanges();
    this.database = db;
  }

  get_info_display(): Observable<any> { return this.info_display; }

  set_name(name: string){
    this.database.object('edepa5/congress/name').set(name);
  }

  set_end(end: number){}

  set_start(start: number){}

  set_description(description: string){
    this.database.object('edepa5/congress/description').set(description);
  }

  set_location(location: string){
    this.database.object('edepa5/congress/location').set(location);
  }
}

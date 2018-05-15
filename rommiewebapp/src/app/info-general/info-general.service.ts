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

  set_end(end: number){
    this.database.object('edepa5/congress/end').set(end);
  }

  set_start(start: number){
    this.database.object('edepa5/congress/start').set(start);
  }

  set_description(description: string){
    this.database.object('edepa5/congress/description').set(description);
  }

  set_location(location: string){
    this.database.object('edepa5/congress/location').set(location);
  }

  set_x(xCoord: number){
    this.database.object('edepa5/congress/xCoord').set(xCoord);
  }

  set_y(yCoord: number){
    this.database.object('edepa5/congress/yCoord').set(yCoord);
  }
}

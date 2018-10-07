import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Exhibitor } from "./Exhibitor";

@Injectable()
export class ExpositoresService {

  exhibitorsRef: AngularFireList<any>;
  public exhibitor_list: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.exhibitorsRef = db.list('edepa5/people');
    this.exhibitor_list = this.exhibitorsRef.snapshotChanges().pipe().
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    );
    this.database = db;
  }

  private database: any;

  get_exhibitors_list(): Observable<any[]>{
    return this.exhibitor_list;
  }

  delete_exhibitor(_key){
    try {
      this.database.list('edepa5/people/' + _key).remove();
      return true;
    }
    catch(e) {
      console.log(e.toString());
      return false;
    }
  }

  edit_exhibitor(_key, updated_object){
    try {
      this.database.list('edepa5/people/').update(_key, updated_object);
      return true;
    }
    catch(e) {
      console.log(e.toString());
      return false;
    }
  }

  save_exhibitor(new_exhibitor: Exhibitor) : boolean {
    try {
      this.database.list('edepa5/people').push(new_exhibitor);
      return true;
    }
    catch(e) {
      console.log(e.toString());
      return false;
    }
  }

  delete_relation(event, exhibitor) {
    try {
      this.delete_exhibitor_from_event(event, exhibitor);
      this.delete_event_from_exhibitor(event, exhibitor);
      return true;
    }
    catch(e) {
      console.log(e.toString());
      return false;
    }
  }

  delete_exhibitor_from_event(event, exhibitor) {
    try {
      this.database.list('edepa5/schedule/' + event + '/people/' + exhibitor).remove();
    }
    catch (e) {
      throw e;
    }
  }

  delete_event_from_exhibitor(event, exhibitor) {
    try {
      this.database.list('edepa5/people/' + exhibitor + '/events/' + event).remove();
    }
    catch (e) {
      throw e;
    }
  }

}

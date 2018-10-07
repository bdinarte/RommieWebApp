import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { ScheduleEvent } from "./ScheduleEvent";

@Injectable()
export class CronogramaService {

  eventsRef: AngularFireList<any>;
  public event_list: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.eventsRef = db.list('edepa5/schedule');
    this.event_list = this.eventsRef.snapshotChanges().pipe().
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      );
    this.database = db;
  }

  private database: any;

  get_event_list() : Observable<any[]>{
    return this.event_list;
  }

  delete_event(_key){
    try {
      this.database.list('edepa5/schedule/' + _key).remove();
      return true;
    }
    catch(e) {
      console.log(e.toString());
      return false;
    }
  }

  edit_event(_key, updated_object){
    try {
      this.database.list('edepa5/schedule/').update(_key, updated_object);
      return true;
    }
    catch(e) {
      console.log(e.toString());
      return false;
    }
  }

  add_relation(event_key, exhibitor_key){
    try{
      this.database.object('edepa5/schedule/' + event_key + '/people/' + exhibitor_key).set(true);
      this.database.object('edepa5/people/' + exhibitor_key + '/events/' + event_key).set(true);
      return true;
    }
    catch(e) {
      console.log(e.toString());
      return false;
    }
  }

  save_new_event(new_event: ScheduleEvent) : boolean {
    try {
      this.database.list('edepa5/schedule').push(new_event);
      return true;
    }
    catch(e) {
      console.log(e.toString());
      return false;
    }
  }

}

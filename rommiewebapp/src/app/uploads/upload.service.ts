
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class UploadService {

  task: AngularFireUploadTask;
  snapshot: Observable<any>;

  constructor(private storage: AngularFireStorage) { }

  uploadImage(event: FileList): boolean {

    try {
      const file = event.item(0);

      const path = 'edepa_map.png';

      this.task = this.storage.upload(path, file);
      this.snapshot = this.task.snapshotChanges();
    }
    catch(e) {
      return false;
    }
  }

  isActive(snapshot){
    return snapshot.state == 'running';
  }

}

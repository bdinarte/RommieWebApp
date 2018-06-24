
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class UploadService {

  task: AngularFireUploadTask;
  snapshot: Observable<any>;

  constructor(private storage: AngularFireStorage) { }

  uploadImage(event: FileList): boolean {

    const path = 'edepa_map.png';

    try {
      this.snapshot = this.storage.ref(path).delete();
    }
    catch (e) {
      this.snapshot = null;
    }

    try {
      const file = event.item(0);

      this.task = this.storage.upload(path, file);
      this.snapshot = this.task.snapshotChanges();

      return true;
    }
    catch(e) {
      return false;
    }
  }

}

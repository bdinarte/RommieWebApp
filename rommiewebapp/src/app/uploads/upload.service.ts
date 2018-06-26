
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class UploadService {

  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  download_url: Observable<string>;

  constructor(private storage: AngularFireStorage) { }

  uploadImage(event: FileList): boolean {

    const filename = 'edepa_map' + (new Date()).toTimeString() + '.png';
    console.log((new Date()).toTimeString());

    try {
      this.snapshot = this.storage.ref(filename).delete();
    }
    catch (e) {
      this.snapshot = null;
    }

    try {
      const file = event.item(0);

      this.task = this.storage.upload(filename, file);
      this.download_url = this.task.downloadURL();
      console.log(this.download_url);

      this.snapshot = this.task.snapshotChanges();

      return true;
    }
    catch(e) {
      return false;
    }
  }

}

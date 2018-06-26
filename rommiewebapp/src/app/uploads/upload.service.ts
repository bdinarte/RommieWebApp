
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'
import { finalize } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UploadService {

  task: AngularFireUploadTask;
  download_url: any;

  constructor(private storage: AngularFireStorage, private database: AngularFireDatabase) {}

  uploadImage(event: FileList): boolean {

    const filename = 'edepa_map.png';

    try {
      const file = event.item(0);

      this.task = this.storage.upload(filename, file);

      this.task.snapshotChanges().pipe(
        finalize(() => {
          let minimap = this.storage.ref(filename).getDownloadURL();
          minimap.toPromise().then(url => this.database.object('edepa5/config/minimap').set(url))
        }
        )
      ).subscribe();

      return true;
    }
    catch(e) {
      return false;
    }

  }

}

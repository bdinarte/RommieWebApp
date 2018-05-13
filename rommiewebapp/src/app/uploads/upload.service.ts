
import { Injectable } from '@angular/core';
import { Upload } from "./upload";
import * as firebase from 'firebase'

@Injectable()
export class UploadService {

  constructor() { }

  upload_map(upload: Upload) {
    let storageReference = firebase.storage().ref();
    let uploadTask = storageReference.child('edepa_map.png').put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => { },
      (error) => { console.log(error)},
      () => {
      // TODO: insertar acción de éxito
      }
      );

  }

}

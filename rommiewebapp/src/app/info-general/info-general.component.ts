import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { InfoGeneralService } from './info-general.service';
import { UploadService} from "../uploads/upload.service";
import { ModalAvisoComponent } from "../modal-aviso/modal-aviso.component"

@Component({
  selector: 'app-info-general',
  providers: [InfoGeneralService, UploadService],
  templateUrl: './info-general.component.html',
  styleUrls: ['./info-general.component.css']
})

export class InfoGeneralComponent implements OnInit {

  info_display: Observable<any>;
  private selectedFiles: FileList;
  @ViewChild(ModalAvisoComponent) modal: ModalAvisoComponent;

  constructor(private infoService: InfoGeneralService, private uploadService: UploadService) {}

  ngOnInit() { this.get_info_display(); }

  get_info_display(): void {
    this.info_display = this.infoService.get_info_display();
  }

  fileChange(event){
    if (event.target.files.length > 0) {
      this.selectedFiles = event.target.files;
      if (this.selectedFiles.item(0).type.split('/')[0] !== 'image') {
        this.show_error_modal();
        this.selectedFiles = null;
      }
    }
  }

  upload_image(){
    if (this.selectedFiles) {
      let upload_success = this.uploadService.uploadImage(this.selectedFiles);
      if (upload_success) {
        this.show_success_modal()
      }
      else {
        this.show_error_modal()
      }
    }
  }

  update_name(name: string){ this.infoService.set_name(name); }

  update_description(description: string){ this.infoService.set_description(description); }

  update_location(location: string) { this.infoService.set_location(location); }

  update_end(end: number){}

  update_start(start: number){}

  show_success_modal(){
    this.modal.open_modal();
    this.modal.set_message('Imagen guardada con éxito.');
  }

  show_error_modal() {
    this.modal.open_modal();
    this.modal.set_message('No se elegió un archivo válido como imagen.');
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { InfoGeneralService } from './info-general.service';
import { UploadService } from "../uploads/upload.service";
import { ModalAvisoComponent } from "../modal-aviso/modal-aviso.component"

@Component({
  selector: 'app-info-general',
  providers: [InfoGeneralService, UploadService],
  templateUrl: './info-general.component.html',
  styleUrls: ['./info-general.component.css']
})

export class InfoGeneralComponent implements OnInit {

  info_display: Observable<any>;
  minimap: Observable<any>;

  selectedFiles: FileList;
  @ViewChild(ModalAvisoComponent) modal: ModalAvisoComponent;

  constructor(private infoService: InfoGeneralService, private uploadService: UploadService) {}

  ngOnInit() { this.get_info_display(); }

  get_info_display(): void {
    this.info_display = this.infoService.get_info_display();
    this.minimap = this.infoService.get_minimap();
  }

  current_file_name: string = "No se ha seleccionado.";

  fileChange(event){
    if (event.target.files.length > 0) {
      this.selectedFiles = event.target.files;
      this.current_file_name = this.selectedFiles.item(0).name;
      this.show_modal('Archivo seleccionado: ' + this.current_file_name);
    }
  }

  upload_image(){
    if (this.selectedFiles.length > 0) {
      if (this.selectedFiles.item(0).type.split('/')[0] !== 'image') {
        this.show_modal('La extensión del archivo no se reconoce como imagen.');
        this.selectedFiles = null;
      } else {
        let upload_success = this.uploadService.uploadImage(this.selectedFiles);
        if (upload_success) {
          this.show_modal('Imagen guardada con éxito.')
        }
        else {
          this.show_modal('Error al guardar la imagen.')
        }
      }
    }
  }

  update_name(name: string){ this.infoService.set_name(name); }

  update_description(description: string){ this.infoService.set_description(description); }

  update_location(location: string) { this.infoService.set_location(location); }

  update_x(coord: number) { this.infoService.set_x(coord); }

  update_y(coord: number) { this.infoService.set_y(coord); }

  update_end(end){
    let enddate: any = new Date(end);
    this.infoService.set_end(enddate*1)
  }

  update_start(start){
    let startdate: any = new Date(start);
    this.infoService.set_start(startdate*1)
  }

  show_modal(message){
    this.modal.open_modal();
    this.modal.set_message(message);
  }

  double_to_date(_value) {
    return new Date(_value);
  }
}

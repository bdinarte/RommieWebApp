import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { InfoGeneralService } from './info-general.service';
import { UploadService} from "../uploads/upload.service";

@Component({
  selector: 'app-info-general',
  providers: [InfoGeneralService, UploadService],
  templateUrl: './info-general.component.html',
  styleUrls: ['./info-general.component.css']
})

export class InfoGeneralComponent implements OnInit {

  info_display: Observable<any>;
  private selectedFiles: FileList;

  constructor(private infoService: InfoGeneralService, private uploadService: UploadService) {}

  ngOnInit() { this.get_info_display(); }

  get_info_display(): void {
    this.info_display = this.infoService.get_info_display();
  }

  fileChange(event){
    if (event.target.files.length > 0) {
      this.selectedFiles = event.target.files;
      if (this.selectedFiles.item(0).type.split('/')[0] !== 'image') {
        // TODO: show error
        this.selectedFiles = null;
      }
    }
  }

  uploadImage(){
      this.uploadService.uploadImage(this.selectedFiles);
  }

  update_name(name: string){ this.infoService.set_name(name); }

  update_description(description: string){ this.infoService.set_description(description); }

  update_location(location: string) { this.infoService.set_location(location); }

  update_end(end: number){}

  update_start(start: number){}

}

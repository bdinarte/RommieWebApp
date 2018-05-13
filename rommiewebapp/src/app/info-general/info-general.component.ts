import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { InfoGeneralService } from './info-general.service';
import { UploadService} from "../uploads/upload.service";
import { Upload } from "../uploads/upload";

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
    this.selectedFiles = event.target.files;
  }

  uploadImage(){
      this.uploadService.upload_map(new Upload(this.selectedFiles.item(0)));
  }

  update_name(name: string){ this.infoService.set_name(name); }

  update_description(description: string){ this.infoService.set_description(description); }

  update_location(location: string) { this.infoService.set_location(location); }

  update_end(end: number){}

  update_start(start: number){}

}

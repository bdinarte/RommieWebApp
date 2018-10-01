import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ExpositoresService } from './expositores.service';
import { ModalAvisoComponent } from "../modal-aviso/modal-aviso.component"
import {ModalConfirmacionComponent} from "../modal-confirmacion/modal-confirmacion.component";
import {Exhibitor} from "./Exhibitor";

@Component({
  selector: 'app-expositores',
  providers: [ExpositoresService],
  templateUrl: './expositores.component.html',
  styleUrls: ['./expositores.component.css']
})
export class ExpositoresComponent implements OnInit {

  exhibitors_list: Observable<any[]>;
  @ViewChild(ModalAvisoComponent) modal_info: ModalAvisoComponent;
  @ViewChild(ModalConfirmacionComponent) modal_confirm: ModalConfirmacionComponent;

  constructor(private expositoresService: ExpositoresService) { }

  exhibitor_name : string;
  exhibitor_about : string;
  exhibitor_country : string;

  ngOnInit() {
    this.get_exhibitors_list();
    this.exhibitor_name = "";
    this.exhibitor_country = "";
    this.exhibitor_about = "";
  }

  get_exhibitors_list(): void {
    this.exhibitors_list = this.expositoresService.get_exhibitors_list();
  }

  show_modal_info(message){
    this.modal_info.open_modal();
    this.modal_info.set_message(message);
  }

  save_exhibitor(){
    console.log(this.exhibitor_country, this.exhibitor_about, this.exhibitor_name);
    if (this.exhibitor_name == "" || this.exhibitor_name == null){
      this.show_modal_info("Debe ingresar un nombre para el expositor.");
      return;
    }
    if (this.exhibitor_about == "" || this.exhibitor_about == null)
      this.exhibitor_about = null;
    if (this.exhibitor_country == "" || this.exhibitor_country == null)
      this.exhibitor_country = null;

    let new_exhibitor = new Exhibitor(this.exhibitor_name,
                                      this.exhibitor_country,
                                      this.exhibitor_about);

    let save_success = this.expositoresService.save_exhibitor(new_exhibitor);
    if (save_success) {
      this.show_modal_info('Expositor guardado con éxito.');
      this.exhibitor_name = "";
      this.exhibitor_about = "";
      this.exhibitor_country = "";
    }
    else {
      this.show_modal_info('Error al guardar el expositor.');
    }
  }

  exhibitor_key: string;

  show_elimination_modal(key){
    this.exhibitor_key = key;
    this.modal_confirm.open_modal();
    this.modal_confirm.set_header("Confirmación de acción:")
    this.modal_confirm.set_message("¿Desea continuar con la eliminación?");
  }

  elimination_confirmation(response: Boolean) {
    if (response){
     // this.remove_exhibitor(this.key_to_erase);
      // this.remove_relation(this.exhibitor_key, this.event_key);
    }
    else {
      this.exhibitor_key = "";
    }
  }

}

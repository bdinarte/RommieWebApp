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

  editing_key = "null";

  exhibitor_name : string;
  exhibitor_about : string;
  exhibitor_country : string;

  edited_exhibitor_name : string;
  edited_exhibitor_about : string;
  edited_exhibitor_country : string;

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
    if (this.exhibitor_name == "" || this.exhibitor_name == null
      || this.exhibitor_country == "" || this.exhibitor_country == null){
      this.show_modal_info("Debe ingresar un nombre y país para el expositor.");
      return;
    }
    if (this.exhibitor_about == "" || this.exhibitor_about == null)
      this.exhibitor_about = null;

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

  edit_exhibitor(_key) {
    if (this.edited_exhibitor_name == "" || this.edited_exhibitor_name == null
      || this.edited_exhibitor_country == "" || this.edited_exhibitor_country == null){
      this.show_modal_info("Debe ingresar un nombre y país para el expositor.");
      return;
    }
    if (this.edited_exhibitor_about == "" || this.edited_exhibitor_about == null)
      this.edited_exhibitor_about = null;

    let edited_exhibitor = new Exhibitor(this.edited_exhibitor_name,
                                          this.edited_exhibitor_country,
                                          this.edited_exhibitor_about);

    let save_success = this.expositoresService.edit_exhibitor(_key, edited_exhibitor);
    if (save_success) {
      this.show_modal_info('Expositor guardado con éxito.');
      this.edited_exhibitor_name = "";
      this.edited_exhibitor_country = "";
      this.edited_exhibitor_about = "";
      this.editing_key = null;
    }
    else {
      this.show_modal_info('Error al guardar el expositor.');
    }
  }

  change_editing(exhibitor) {
    this.editing_key = exhibitor.key;
    this.edited_exhibitor_name = exhibitor.completeName;
    this.edited_exhibitor_country = exhibitor.personalTitle;
    this.edited_exhibitor_about = exhibitor.about;
  }

  key_to_erase: string;
  event_keys_to_erase: any;

  show_elimination_modal(exhibitor){
    this.key_to_erase = exhibitor.key;
    this.event_keys_to_erase = exhibitor.events;
    this.modal_confirm.open_modal();
    this.modal_confirm.set_header("Confirmación de acción:");
    this.modal_confirm.set_message("¿Desea continuar con la eliminación?");
  }

  elimination_confirmation(response: Boolean) {
    if (response){
      let erasing_keys: any;
      if (this.event_keys_to_erase != null)
        erasing_keys = Object.getOwnPropertyNames(this.event_keys_to_erase);
      else
        erasing_keys = [];

      for (let key of erasing_keys){
        let delete_success = this.expositoresService.delete_exhibitor_from_event(key, this.key_to_erase);
        if (!delete_success) {
          this.show_modal_info('Ocurrieron uno o más errores al eliminar el expositor.')
        }
      }

      let delete_success = this.expositoresService.delete_exhibitor(this.key_to_erase);
      if (delete_success)
        this.show_modal_info('Expositor eliminado con éxito.')
      else
        this.show_modal_info('Ocurrieron uno o más errores al eliminar el expositor.')
    }
    else {
      this.key_to_erase = "";
      this.event_keys_to_erase = null;
    }
  }

  count_len(obj) {
    if (obj)
      return Object.getOwnPropertyNames(obj).length;
    else
      return 0;
  }
}

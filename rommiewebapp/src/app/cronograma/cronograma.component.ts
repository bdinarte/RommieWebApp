
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalNuevoEventoComponent } from "./modal-nuevo-evento/modal-nuevo-evento.component";
import { ScheduleEvent } from "./ScheduleEvent";
import { CronogramaService } from "./cronograma.service";
import { ModalAvisoComponent } from "../modal-aviso/modal-aviso.component";
import { Observable } from 'rxjs/Observable';
import { ModalConfirmacionComponent } from "../modal-confirmacion/modal-confirmacion.component";

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css'],
  providers: [CronogramaService]
})
export class CronogramaComponent implements OnInit {

  @ViewChild(ModalNuevoEventoComponent) modal_event: ModalNuevoEventoComponent;
  @ViewChild(ModalAvisoComponent) modal_info: ModalAvisoComponent;
  @ViewChild(ModalConfirmacionComponent) modal_confirm: ModalConfirmacionComponent;

  constructor(private cronogramaService: CronogramaService) { }

  filter_string: string;

  event_list: Observable<any[]>;
  filtered_events: Observable<any[]>;

  new_or_edit = 'new';

  selected_event: string;

  ngOnInit() {
    this.get_event_list();
    this.filter_string = "";
    this.filtered_events = this.event_list;
  }

  event_selection(event_key: string){
    if (this.selected_event == event_key){
      this.selected_event = "-1";
    }
    else {
      this.selected_event = event_key;
    }
  }

  get_event_list(): void {
    this.event_list = this.cronogramaService.get_event_list();
  }

  onNotify(new_event: ScheduleEvent){
    let save_success = false;
    if (this.new_or_edit == "new") {
      save_success = this.cronogramaService.save_new_event(new_event);
    }
    else {
      save_success = this.cronogramaService.edit_event(this.selected_event, new_event);
    }
    if (save_success) {
      this.show_modal_info('Evento guardado exitosamente.')
    }
    else {
      this.show_modal_info('Error al guardar el evento.')
    }
  }

  process_confirmation(response: Boolean){
    if (response){
      this.remove_event(this.key_to_erase);
    }
    else {
      this.key_to_erase = "";
    }
  }

  filter_events(){
    if (this.filter_string == ""){
      this.filtered_events = this.event_list;
    }
    else {
      this.filtered_events = this.filtered_events.map(events => events.filter(
        evnt => (evnt.title.toLowerCase()).includes(this.filter_string.toLowerCase())
                          || (evnt.eventype.toLowerCase()).includes(this.filter_string.toLowerCase())
                          || (evnt.id.toLowerCase()).includes(this.filter_string.toLowerCase())
                          ));
    }
  }

  show_event_modal(){
    this.new_or_edit = "new";
    this.modal_event.open_modal();
  }

  show_modal_info(message){
    this.modal_info.open_modal();
    this.modal_info.set_message(message);
  }

  key_to_erase: string;

  show_elimination_modal(event_key){
    this.key_to_erase = event_key;
    this.modal_confirm.open_modal();
    this.modal_confirm.set_header("Confirmación de acción:")
    this.modal_confirm.set_message("¿Desea continuar con la eliminación del evento?");
  }

  remove_event(event_key){
    let delete_success = this.cronogramaService.delete_event(event_key);
    if (delete_success) {
      this.show_modal_info('Evento eliminado.')
    }
    else {
      this.show_modal_info('Error al eliminar el evento.')
    }
  }

  show_edit_modal(event_object){
    this.new_or_edit = "edit";
    this.modal_event.open_modal();
    this.modal_event.set_ScheduleEvent(event_object);
  }

  double_to_date(_value) {
    return (new Date(_value)).toLocaleString();
  }
}

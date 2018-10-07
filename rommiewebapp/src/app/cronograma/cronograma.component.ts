
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalNuevoEventoComponent } from "./modal-nuevo-evento/modal-nuevo-evento.component";
import { ScheduleEvent } from "./ScheduleEvent";
import { CronogramaService } from "./cronograma.service";
import { ExpositoresService} from "../expositores/expositores.service";
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

  constructor(private cronogramaService: CronogramaService, private expositoresService: ExpositoresService) {
  }

  filter_string: string;
  exhibitors_list: Observable<any[]>;
  event_list: Observable<any[]>;
  filtered_events: Observable<any[]>;
  filtered_exhibitors: Observable<any[]>;

  new_or_edit = 'new';
  delete_exhibitor_event = 'exhibitor';
  selected_event: string;
  displaying_event: string;
  selected_exhibitors_list: any;

  ngOnInit() {
    this.get_event_list();
    this.get_exhibitors_list();
    this.filter_string = "";
    this.filtered_events = this.event_list;
    this.filtered_exhibitors = this.exhibitors_list;
  }

  event_selection(event_key: string, people_key_list) {
    this.selected_exhibitors_list = people_key_list;
    this.filter_exhibitors();
    this.selected_event = event_key;
  }

  new_exhibitor_key = null;
  selected_exhibitor_name = "";
  display_new_exhibitor = false;

  select_new_exhib(exhibitor){
    this.new_exhibitor_key = exhibitor.key;
    this.selected_exhibitor_name = exhibitor.completeName;
  }

  cancel_new_exhibitor() {
    this.new_exhibitor_key = null;
    this.display_new_exhibitor = false;
  }

  set_displaying_event(event) {
    if (this.displaying_event == event.key) {
      this.displaying_event = "-1";
    }
    else {
      this.displaying_event = event.key;
      this.new_exhibitor_key = null;
      this.selected_exhibitor_name = "";
      this.display_new_exhibitor = false;
    }
  }

  toggle_exhibitors(event) {
    if (this.display_new_exhibitor) {
      this.display_new_exhibitor = false;
    }
    else {
      this.displaying_event = event.key;
      this.display_new_exhibitor = true;
    }
  }

  get_event_list(): void {
    this.event_list = this.cronogramaService.get_event_list();
  }

  get_exhibitors_list(): void {
    this.exhibitors_list = this.expositoresService.get_exhibitors_list();
  }

  onNotify(new_event: ScheduleEvent) {
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

  elimination_confirmation(response: Boolean) {
    if (response) {
      if(this.delete_exhibitor_event == 'event'){

        let exhibitor_keys: any;
        if(this.selected_exhibitors_list != null)
           exhibitor_keys = Object.getOwnPropertyNames(this.selected_exhibitors_list);
        else
          exhibitor_keys = [];

        for (let key of exhibitor_keys){
          this.remove_relation(this.event_key_to_erase, key);
        }
        this.remove_event(this.event_key_to_erase);
      }
      else {
        this.remove_relation(this.event_key_to_erase, this.exhibitor_key_to_erase);
      }
    }
    else {
      this.event_key_to_erase = "";
      this.exhibitor_key_to_erase = "";
    }
  }

  filter_events() {
    if (this.filter_string == "") {
      this.filtered_events = this.event_list;
    }
    else {
      this.filtered_events = this.event_list.map(events => events.filter(
        evnt => (evnt.title.toLowerCase()).includes(this.filter_string.toLowerCase())
          || (evnt.eventype.toLowerCase()).includes(this.filter_string.toLowerCase())
          || (evnt.id.toLowerCase()).includes(this.filter_string.toLowerCase())
      ));
    }
  }

  filter_exhibitors() {
    let exhibitor_keys: any;
    if(this.selected_exhibitors_list != null)
      exhibitor_keys = Object.getOwnPropertyNames(this.selected_exhibitors_list);
    else
      exhibitor_keys = [];

    this.filtered_exhibitors = this.exhibitors_list.map(exhibitors => exhibitors.filter(
      exhibitor => (exhibitor_keys.includes(exhibitor.key))
    ));
  }

  show_event_modal() {
    this.new_or_edit = "new";
    this.modal_event.open_modal();
  }

  show_modal_info(message) {
    this.modal_info.open_modal();
    this.modal_info.set_message(message);
  }

  event_key_to_erase: string;
  exhibitor_key_to_erase: string;

  show_elimination_modal(event_key) {
    this.delete_exhibitor_event = 'event';
    this.event_key_to_erase = event_key;
    this.modal_confirm.open_modal();
    this.modal_confirm.set_header("Confirmación de acción:");
    this.modal_confirm.set_message("¿Desea continuar con la eliminación del evento?");
  }

  show_exhibitor_elimination_modal(event_key, exhibitor_key) {
    this.delete_exhibitor_event = 'exhibitor';
    this.event_key_to_erase = event_key;
    this.exhibitor_key_to_erase = exhibitor_key;
    this.modal_confirm.open_modal();
    this.modal_confirm.set_header("Confirmación de acción:");
    this.modal_confirm.set_message("¿Desea continuar con la eliminación de la asignación?");
  }

  remove_event(event_key) {
    let delete_success = this.cronogramaService.delete_event(event_key);
    if (delete_success) {
      this.show_modal_info('Evento eliminado.')
    }
    else {
      this.show_modal_info('Error al eliminar el evento.')
    }
  }

  add_relation(event_key){
    if (this.selected_exhibitor_name) {
      let save_success = this.cronogramaService.add_relation(event_key, this.new_exhibitor_key);
      if (save_success) {
        this.selected_exhibitor_name = null;
        this.show_modal_info('Asignación guardada exitosamente.')
      }
      else {
        this.show_modal_info('Error al guardar la asignación.')
      }
    } else {
      this.show_modal_info('Seleccione un expositor.')
    }
  }

  remove_relation(event_key, exhibitor_key){
    let delete_success = this.expositoresService.delete_relation(event_key, exhibitor_key);
    if (delete_success) {
      delete this.selected_exhibitors_list[exhibitor_key];
      this.filter_exhibitors();
      this.show_modal_info('Asignación eliminada.');
    }
    else {
      this.show_modal_info('Error al eliminar el evento.')
    }
  }

  show_edit_modal(event_object) {
    this.new_or_edit = "edit";
    this.modal_event.open_modal();
    this.modal_event.set_ScheduleEvent(event_object);
  }

  double_to_date(_value) {
    return (new Date(_value)).toLocaleString();
  }

}


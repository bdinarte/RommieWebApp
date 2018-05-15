
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalNuevoEventoComponent } from "./modal-nuevo-evento/modal-nuevo-evento.component";
import { ScheduleEvent } from "./modal-nuevo-evento/ScheduleEvent";
import { CronogramaService } from "./cronograma.service";
import { ModalAvisoComponent } from "../modal-aviso/modal-aviso.component";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css'],
  providers: [CronogramaService]
})
export class CronogramaComponent implements OnInit {

  @ViewChild(ModalNuevoEventoComponent) modal_event: ModalNuevoEventoComponent;
  @ViewChild(ModalAvisoComponent) modal_info: ModalAvisoComponent;

  constructor(private cronogramaService: CronogramaService) { }

  event_list: Observable<any[]>;

  ngOnInit() { this.get_event_list() }

  get_event_list(): void {
    this.event_list = this.cronogramaService.get_event_list();
  }

  onNotify(new_event: ScheduleEvent){
    let save_success = this.cronogramaService.save_new_event(new_event);
    if (save_success) {
      this.show_modal_info('Evento guardado exitosamente.')
    }
    else {
      this.show_modal_info('Error al guardar el evento.')
    }
  }

  show_event_modal(){
    this.modal_event.open_modal();
  }

  show_modal_info(message){
    this.modal_info.open_modal();
    this.modal_info.set_message(message);
  }

  remove_event(evnt){
    let delete_success = this.cronogramaService.delete_event(evnt);
    if (delete_success) {
      this.show_modal_info('Evento eliminado.')
    }
    else {
      this.show_modal_info('Error al eliminar el evento.')
    }
  }

  edit_event(evnt){

  }
}


import { Component, EventEmitter, Output } from '@angular/core';
import {ScheduleEvent} from "../cronograma/ScheduleEvent";

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent {

  constructor() { }

  @Output() notify: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  accept_modal(){
    this.notify.emit(true);
    this.display = 'none';
  }

  header = '¡Confirmación de acción';
  message = 'Vacío.';
  display = 'none';

  open_modal() {
    this.display='block';
  }

  close_modal(){
    this.notify.emit(false);
    this.display = 'none';
  }

  set_header(header: string){
    this.header = header;
  }

  set_message(message: string){
    this.message = message;
  }

}

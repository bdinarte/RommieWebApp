
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ScheduleEvent } from "../ScheduleEvent";

@Component({
  selector: 'app-modal-nuevo-evento',
  templateUrl: './modal-nuevo-evento.component.html',
  styleUrls: ['./modal-nuevo-evento.component.css']
})
export class ModalNuevoEventoComponent implements OnInit {

  constructor() {  }

  @Output() notify: EventEmitter<ScheduleEvent> = new EventEmitter<ScheduleEvent>();
  scheduleEvent: ScheduleEvent;

  ngOnInit(): void {
    this.scheduleEvent = new ScheduleEvent();
  }

  set_ScheduleEvent(schedule_object){
    this.set_title(schedule_object.title);
    this.set_eventype(schedule_object.eventype);
    this.set_briefEnglish(schedule_object.briefEnglish);
    this.set_briefSpanish(schedule_object.briefSpanish);
    this.set_end(schedule_object.end);
    this.set_start(schedule_object.start);
    this.set_id(schedule_object.id);
    this.set_location(schedule_object.location);
  }

  display_alert = false;

  save_event(){
    if (!this.invalid_fields()){
      this.display_alert = false;
      this.notify.emit(this.scheduleEvent);
      this.close_modal();
    } else {
      this.display_alert = true;
    }
  }

  invalid_fields(){
    let schEv = this.scheduleEvent;
    if (schEv.get_briefEnglish() == "") return true;
    if (schEv.get_briefSpanish() == "") return true;
    if (schEv.get_eventype() == "") return true;
    if (schEv.get_id() == "") return true;
    if (schEv.get_location() == "") return true;
    if (schEv.get_title() == "") return true;
    if (schEv.get_end() <= 0) return true;
    if (schEv.get_start() <= 0) return true;
  }

  set_title(title){
    this.scheduleEvent.set_title(title);
  }

  set_location(loc){
    this.scheduleEvent.set_location(loc);
  }

  set_briefEnglish(brief){
    this.scheduleEvent.set_briefEnglish(brief);
  }

  set_briefSpanish(brief){
    this.scheduleEvent.set_briefSpanish(brief);
  }

  set_id(_id){
    this.scheduleEvent.set_id(_id);
  }

  set_eventype(eventype){
    this.scheduleEvent.set_eventype(eventype);
  }

  set_start(_date){
    let long_date: any = new Date(_date);
    this.scheduleEvent.set_start(long_date*1);
    return '';
  }

  set_end(_date){
    let long_date: any = new Date(_date);
    this.scheduleEvent.set_end(long_date*1);
    return '';
  }

  display = 'none';

  open_modal() {
    this.scheduleEvent = new ScheduleEvent();
    this.display='block';
    this.display_alert = false;
  }

  close_modal(){
    this.display = 'none';
    this.display_alert = false;
  }

  double_to_date(_value) {
    return new Date(_value);
  }

}

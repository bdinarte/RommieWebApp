
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
    this.set_fileUrl(schedule_object.fileUrl);
    this.set_end(schedule_object.end);
    this.set_start(schedule_object.start);
    this.set_id(schedule_object.id);
    this.set_location(schedule_object.location);

  }

  display_alert = false;

  hide_display_alert() {
    this.display_alert = false;
  }

  check_optional_fields(){
    if (this.scheduleEvent.get_briefEnglish() == "" || this.scheduleEvent.get_briefEnglish() == null)
      this.scheduleEvent.set_briefEnglish(null);
    if (this.scheduleEvent.get_briefSpanish() == "" || this.scheduleEvent.get_briefSpanish() == null)
      this.scheduleEvent.set_briefSpanish(null);
    if (this.scheduleEvent.get_fileUrl() == "" || this.scheduleEvent.get_fileUrl() == null)
      this.scheduleEvent.set_fileUrl(null);
  }

  save_event(){
    if (!this.invalid_fields()){
      this.check_optional_fields();
      this.display_alert = false;
      this.notify.emit(this.scheduleEvent);
      this.close_modal();
    } else {
      this.display_alert = true;
    }
  }

  invalid_fields(){
    let schEv = this.scheduleEvent;
    if (schEv.get_eventype() == "" || schEv.get_eventype() == null) return true;
    if (schEv.get_id() == "" || schEv.get_id() == null) return true;
    if (schEv.get_location() == "" || schEv.get_location() == null) return true;
    if (schEv.get_title() == "" || schEv.get_title() == null) return true;
    if (schEv.get_end() <= 0 || schEv.get_end() == null) return true;
    if (schEv.get_start() <= 0 || schEv.get_start() == null) return true;
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

  set_fileUrl(url){
    this.scheduleEvent.set_fileUrl(url);
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

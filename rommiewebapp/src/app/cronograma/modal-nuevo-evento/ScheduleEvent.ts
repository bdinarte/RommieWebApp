
export class Exhibitor {

  completeName: string;
  personalTitle: string;

  constructor (name, title){
    this.completeName = name;
    this.personalTitle = title;
  }

  get_personalTitle(): string {
    return this.personalTitle;
  }

  set_personalTitle(value: string) {
    this.personalTitle = value;
  }

  get_completeName(): string {
    return this.completeName;
  }

  set_completeName(value: string) {
    this.completeName = value;
  }
}

export class ScheduleEvent {

  briefEnglish: string;
  briefSpanish: string;
  eventype: string;
  id: string;
  location: string;
  title: string;
  start: number;
  end: number;
  exhibitors: Exhibitor[];

  constructor(){
    this.briefEnglish = '';
    this.briefSpanish = '';
    this.eventype = '';
    this.id = '';
    this.location = '';
    this.title = '';
    let _date: any = new Date();
    this.start = _date*1;
    this.end = _date*1;
    let temp_exhibitor = new Exhibitor('Sin expositor asignado.', 'Sin expositor asignado.');
    this.exhibitors = [temp_exhibitor];
  }

  add_exhibitor(name, title) {
    this.exhibitors.push( new Exhibitor(name, title) );
  }

  del_exhibitor(name) {
    var index = this.exhibitors.findIndex(x => x.get_completeName()==name);
    if (index > -1) {
      this.exhibitors.splice(index, 1);
    }
  }

  get_briefEnglish(): string {
    return this.briefEnglish;
  }

  set_briefEnglish(value: string) {
    this.briefEnglish = value;
  }

  get_briefSpanish(): string {
    return this.briefSpanish;
  }

  set_briefSpanish(value: string) {
    this.briefSpanish = value;
  }

  get_eventype(): string {
    return this.eventype;
  }

  set_eventype(value: string) {
    this.eventype = value;
  }

  get_id(): string {
    return this.id;
  }

  set_id(value: string) {
    this.id = value;
  }

  get_location(): string {
    return this.location;
  }

  set_location(value: string) {
    this.location = value;
  }

  get_title(): string {
    return this.title;
  }

  set_title(value: string) {
    this.title = value;
  }

  get_start(): number {
    return this.start;
  }

  set_start(value: number) {
    this.start = value;
  }

  get_end(): number {
    return this.end;
  }

  set_end(value: number) {
    this.end = value;
  }
}

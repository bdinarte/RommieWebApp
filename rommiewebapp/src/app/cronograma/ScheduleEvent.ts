
export class ScheduleEvent {

  briefEnglish: string;
  briefSpanish: string;
  fileUrl: string;
  eventype: string;
  id: string;
  location: string;
  title: string;
  start: number;
  end: number;

  constructor(){
    this.briefEnglish = '';
    this.briefSpanish = '';
    this.fileUrl = '';
    this.eventype = '';
    this.id = '';
    this.location = '';
    this.title = '';
    let _date: any = new Date();
    this.start = _date*1;
    this.end = _date*1;
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

  get_fileUrl(): string {
    return this.fileUrl;
  }

  set_fileUrl(value: string) {
    this.fileUrl = value;
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

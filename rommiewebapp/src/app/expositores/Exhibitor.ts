
export class Exhibitor {

  completeName: string;
  personalTitle: string;
  about: string;

  constructor (name, title, about){
    this.completeName = name;
    this.personalTitle = title;
    this.about = about;
  }

  get_about(): string {
    return this.about;
  }

  set_about(value: string) {
    this.about = value;
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

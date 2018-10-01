
export class NewsArticle {

  content: string;
  title: string;
  time: number;

  constructor(content, title) {
    this.content = content;
    this.title = title;
    let _date : any = new Date();
    this.time = _date*1;
  }

}

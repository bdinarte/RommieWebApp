
export class NewsArticle {

  content: string;
  time: number;
  userid: string;
  username: string;

  constructor(content) {
    this.content = content;
    let _date : any = new Date();
    this.time = _date*1;
    this.userid = 'J5oUpZO7EbT2ChY0whwwmTpRl7w1';
    this.username = 'EDEPA';
  }

}

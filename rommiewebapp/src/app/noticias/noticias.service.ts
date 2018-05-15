import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { NewsArticle } from "./NewsArticle";

@Injectable()
export class NoticiasService {

  newsRef: AngularFireList<any>;
  private news_list: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.newsRef = db.list('edepa5/news');
    this.news_list = this.newsRef.snapshotChanges().pipe().
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    );
    this.database = db;
  }

  private database: any;

  get_news_list() : Observable<any[]>{
    return this.news_list;
  }

  delete_article(_key){
    try {
      this.database.list('edepa5/news/' + _key).remove();
      return true;
    }
    catch(e) {
      return false;
    }
  }

  save_new_article(new_article: NewsArticle) : boolean {
    try {
      this.database.list('edepa5/news').push(new_article);
      return true;
    }
    catch(e) {
      return false;
    }
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalAvisoComponent } from "../modal-aviso/modal-aviso.component";
import { NewsArticle } from "./NewsArticle";
import { NoticiasService } from "./noticias.service";
import { Observable } from 'rxjs/Observable'
import {ModalConfirmacionComponent} from "../modal-confirmacion/modal-confirmacion.component";

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
  providers: [NoticiasService]
})
export class NoticiasComponent implements OnInit {

  @ViewChild(ModalAvisoComponent) modal_info: ModalAvisoComponent;
  @ViewChild(ModalConfirmacionComponent) modal_confirm: ModalConfirmacionComponent;

  constructor(private noticiasService: NoticiasService) { }

  news_list: Observable<any[]>;

  ngOnInit() {
    this.get_news_list();
    this.new_article_content = "";
    this.new_article_title = "";
  }

  get_news_list(): void {
    this.news_list = this.noticiasService.get_news_list();
  }

  show_modal_info(message){
    this.modal_info.open_modal();
    this.modal_info.set_message(message);
  }

  key_to_erase: string;

  process_confirmation(response: Boolean){
    if (response){
      this.remove_article(this.key_to_erase);
    }
    else {
      this.key_to_erase = "";
    }
  }

  show_elimination_modal(event_key){
    this.key_to_erase = event_key;
    this.modal_confirm.open_modal();
    this.modal_confirm.set_header("Confirmación de acción:")
    this.modal_confirm.set_message("¿Desea continuar con la eliminación de esta noticia?");
  }

  remove_article(_key){
    let delete_success = this.noticiasService.delete_article(_key);
    if (delete_success) {
      this.show_modal_info('Noticia eliminada.')
    }
    else {
      this.show_modal_info('Error al eliminar la noticia.')
    }
  }

  double_to_date(_value) {
    return (new Date(_value)).toLocaleString();
  }

  new_article_content: string;
  new_article_title: string;

  add_new_article(){
    if (this.new_article_content == "" || this.new_article_content == null)
      this.new_article_content = null;

    if (this.new_article_title == "" || this.new_article_title == null)
      this.new_article_title = null;

    let new_article = new NewsArticle(this.new_article_content, this.new_article_title);
    let save_success = this.noticiasService.save_new_article(new_article);
    if (save_success) {
      this.show_modal_info('Noticia publicada.')
      this.new_article_title = "";
      this.new_article_content = "";
    }
    else {
      this.show_modal_info('Error al publicar la noticia.')
    }
  }
}
